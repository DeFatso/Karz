import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      if (!user) return;

      try {
        const carsRef = collection(db, "cars");
        const q = query(carsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userCars = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCars(userCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have been logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cars</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-4"
      >
        Logout
      </button>
      {cars.length === 0 ? (
        <p>No cars assigned to you yet.</p>
      ) : (
        <ul>
          {cars.map((car) => (
            <li key={car.id} className="mb-2 border p-2 rounded">
              {car.make} {car.model} ({car.year}) - ${car.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;