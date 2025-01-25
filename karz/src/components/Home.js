import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Make sure this path matches your setup

const Home = () => {
  const [cars, setCars] = useState([]); // State to store cars
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carsList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));
        setCars(carsList); // Update state with fetched cars
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p>Loading cars...</p>; // Show a loading message while fetching
  }

  return (
        <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to Karz</h1>
        <p className="mt-4">Browse amazing cars below.</p>
        <ul className="mt-6 space-y-3">
            {cars.map((car) => (
            <li key={car.id} className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-lg font-semibold">{car.name}</h2>
                <p>Model: {car.model}</p>
                <p>Price: ${car.price}</p>
                <p>Mileage: {car.mileage}km</p>
                {car.imageUrl && (
                <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="mt-2 w-full max-w-xs mx-auto"
                />
                )}
            </li>
            ))}
        </ul>
        </div>
  );
};

export default Home;

