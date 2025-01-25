import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const addUserWithRole = async (uid, email, role) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      role, // "admin" or "user"
    });
    console.log("User role set successfully!");
  } catch (error) {
    console.error("Error setting user role:", error);
  }
};
