import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const [user, loading] = useAuthState(auth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setIsAuthorized(false);
        setRoleLoading(false);
        return;
      }

      if (adminOnly) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setIsAuthorized(userData.role === "admin");
          } else {
            setIsAuthorized(false);
          }
        } catch (error) {
          console.error("Error checking role:", error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(true);
      }
      setRoleLoading(false);
    };

    checkRole();
  }, [user, adminOnly]);

  if (loading || roleLoading) {
    return <p>Loading...</p>; // Avoid rendering until auth and role check are done
  }

  if (!user || !isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
