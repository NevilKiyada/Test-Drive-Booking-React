





import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function ShowroomList() {
  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/showrooms/all");
        setShowrooms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching showrooms:", err);
        setError("Failed to load showrooms");
        setLoading(false);
      }
    };

    fetchShowrooms();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading showrooms...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

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
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">Our Showrooms</h1>
      </motion.div>

      <motion.div
        className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showrooms.map((showroom) => (
          <motion.div
            key={showroom._id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative h-48">
              <img
                src={showroom.image || "https://via.placeholder.com/300"}
                alt={showroom.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{showroom.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{showroom.location}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{showroom.phone}</p>
              <div className="mt-4">
                <Link
                  to={`/showrooms/${showroom._id}`}
                  className="btn-primary inline-block bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600"
                >
                  View Cars
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ShowroomList;
