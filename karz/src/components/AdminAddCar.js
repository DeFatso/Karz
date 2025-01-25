import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc, getDocs } from "firebase/firestore";

const AdminAddCar = () => {
  const [car, setCar] = useState({ make: "", model: "", year: "", price: "", userId: "" });
  const [users, setUsers] = useState([]);

  // Fetch all users for assigning cars
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const userList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "cars"), {
        ...car,
        createdAt: new Date(),
      });

      alert("Car added successfully!");
      setCar({ make: "", model: "", year: "", price: "", userId: "" });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add a Car</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make"
          value={car.make}
          onChange={(e) => setCar({ ...car, make: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
          required
        />
        <select
          value={car.userId}
          onChange={(e) => setCar({ ...car, userId: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">Assign to User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email || user.id}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AdminAddCar;
