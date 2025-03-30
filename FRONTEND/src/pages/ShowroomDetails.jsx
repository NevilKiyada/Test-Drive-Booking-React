
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

function ShowroomDetails() {
  const { id } = useParams(); // Get showroom ID from URL
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cars for the showroom
    const fetchCars = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cars/showroom/${id}`);
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [id]);

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="py-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">Available Cars</h1>
      </motion.div>

      {/* Show loading state */}
      {loading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">No cars available in this showroom.</p>
      ) : (
        <motion.div
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {cars.map((car) => (
            <motion.div
              key={car._id}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-48">
                <img
                  src={car.imageUrl || "https://via.placeholder.com/300"}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{car.model}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${car.price.toLocaleString()}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Brand: {car.brand}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Year: {car.year}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Availability: {car.availability ? "Available" : "Sold Out"}
                  </p>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/cars/${car._id}`}
                    className="btn-primary inline-block bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default ShowroomDetails;
 