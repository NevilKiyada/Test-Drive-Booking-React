// import React from 'react';

// import { Link } from 'react-router-dom';

// // Dummy data for showrooms
// const showrooms = [
//   {
//     id: 1,
//     name: 'BMW Excellence',
//     location: 'Downtown',
//     image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=300',
//     cars: 15,
//   },
//   {
//     id: 2,
//     name: 'Audi Premium',
//     location: 'Westside',
//     image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=300',
//     cars: 12,
//   },
//   {
//     id: 3,
//     name: 'Mercedes-Benz Star',
//     location: 'Eastside',
//     image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=300',
//     cars: 18,
//   },
// ];

// function ShowroomList() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Our Showrooms</h1>
//         <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {showrooms.map((showroom) => (
//             <div
//               key={showroom.id}
//               className="bg-white overflow-hidden shadow rounded-lg"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={showroom.image}
//                   alt={showroom.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-lg font-medium text-gray-900">{showroom.name}</h3>
//                 <p className="mt-1 text-sm text-gray-500">{showroom.location}</p>
//                 <p className="mt-2 text-sm text-gray-600">{showroom.cars} cars available</p>
//                 <div className="mt-4">
//                   <Link
//                     to={`/showrooms/${showroom.id}`}
//                     className="btn-primary inline-block"
//                   >
//                     View Cars
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShowroomList;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function ShowroomList() {
//   const [showrooms, setShowrooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchShowrooms = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/showrooms/all");
//         setShowrooms(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching showrooms:", err);
//         setError("Failed to load showrooms");
//         setLoading(false);
//       }
//     };

//     fetchShowrooms();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-lg">Loading showrooms...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-lg text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Our Showrooms</h1>
//         <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {showrooms.map((showroom) => (
//             <div
//               key={showroom._id}
//               className="bg-white overflow-hidden shadow rounded-lg"
//             >
//               <div className="relative h-48">
//                 <img
//                   src={showroom.image || "https://via.placeholder.com/300"}
//                   alt={showroom.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-lg font-medium text-gray-900">{showroom.name}</h3>
//                 <p className="mt-1 text-sm text-gray-500">{showroom.location}</p>
//                 <p className="mt-2 text-sm text-gray-600">{showroom.phone}</p>
//                 <div className="mt-4">
//                   <Link
//                     to={`/showrooms/${showroom._id}`}
//                     className="btn-primary inline-block"
//                   >
//                     View Cars
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShowroomList;






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
