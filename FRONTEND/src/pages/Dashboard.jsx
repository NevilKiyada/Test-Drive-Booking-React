// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// function Dashboard() {
//   const { user } = useAuth();

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
//         <div className="mt-6">
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>
//               <p className="mt-1 text-sm text-gray-500">Personal details and bookings.</p>
//             </div>
//             <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
//               <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
//                 <div className="sm:col-span-1">
//                   <dt className="text-sm font-medium text-gray-500">Email address</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
//                 </div>
//                 <div className="sm:col-span-1">
//                   <dt className="text-sm font-medium text-gray-500">Account type</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{user.role}</dd>
//                 </div>
//               </dl>
//             </div>
//           </div>

//           <div className="mt-8">
//             <h3 className="text-lg font-medium text-gray-900">Your Bookings</h3>
//             <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <p className="text-sm text-gray-500">No bookings found.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Daimport React, { useEffect, useState } from "react";



// import { useAuth } from "../contexts/AuthContext";
// import React, { useEffect, useState } from "react";

// function Dashboard() {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user || !(user._id || user.id)) {
//       console.error("User ID missing:", user);
//       return;
//     }

//     const fetchBookings = async () => {
//       const userId = user._id || user.id; // Handle both cases
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/bookings/user/${userId}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch bookings");

//         const data = await response.json();
//         console.log("Fetched bookings:", data);
//         setBookings(data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [user]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

//         <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>
//             <p className="mt-1 text-sm text-gray-500">
//               Personal details and bookings.
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
//             <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
//               <div className="sm:col-span-1">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Email address
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900">
//                   {user?.email || "N/A"}
//                 </dd>
//               </div>
//               <div className="sm:col-span-1">
//                 <dt className="text-sm font-medium text-gray-500">
//                   Account type
//                 </dt>
//                 <dd className="mt-1 text-sm text-gray-900">
//                   {user?.role || "N/A"}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h3 className="text-lg font-medium text-gray-900">Your Bookings</h3>
//           {loading ? (
//             <p className="text-gray-500">Loading your bookings...</p>
//           ) : error ? (
//             <p className="text-red-500">{error}</p>
//           ) : bookings.length === 0 ? (
//             <p className="text-sm text-gray-500">No bookings found.</p>
//           ) : (
//             <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
//               <div className="px-4 py-5 sm:p-6">
//                 <ul>
//                   {bookings.map((booking, index) => (
//                     <li key={index} className="border-b py-4">
//                       <p className="text-sm text-gray-900 font-semibold">
//                         {booking?.car?.brand} - {booking?.car?.model}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Showroom: {booking?.showroom?.name} (
//                         {booking?.showroom?.location})<br />
//                         {/* Date: {new Date(booking?.date).toLocaleString()} */}
                        
//                         <p className="text-sm text-gray-600">
//                           Date: {new Date(booking?.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
//                         </p>


//                         <br />
//                         Status: {booking?.status}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;





import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !(user._id || user.id)) {
      console.error("User ID missing:", user);
      return;
    }

    const fetchBookings = async () => {
      const userId = user._id || user.id;
      try {
        const response = await fetch(
          `http://localhost:5000/api/bookings/user/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

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
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 text-center">Dashboard</h1>
      </motion.div>

      <motion.div
        className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl rounded-lg overflow-hidden text-white p-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold">Your Profile</h2>
        <p className="mt-1 text-sm">Personal details and bookings.</p>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold">Full Name</dt>
            <dd className="mt-1 text-sm">{user?.name || "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">Email address</dt>
            <dd className="mt-1 text-sm">{user?.email || "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">Phone</dt>
            <dd className="mt-1 text-sm">{user?.phone || "N/A"}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">Account type</dt>
            <dd className="mt-1 text-sm">{user?.role || "N/A"}</dd>
          </div>
          {user?.showroom && (
            <div>
              <dt className="text-sm font-semibold">Showroom</dt>
              <dd className="mt-1 text-sm">{user?.showroom.name || "No showroom"}</dd>
            </div>
          )}
        </div>
      </motion.div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your Bookings</h3>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading your bookings...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No bookings found.</p>
        ) : (
          <motion.div
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {bookings.map((booking, index) => (
              <motion.div key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5" whileHover={{ scale: 1.05 }}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{booking?.car?.brand} - {booking?.car?.model}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Showroom: {booking?.showroom?.name} ({booking?.showroom?.location})</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Date: {new Date(booking?.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">{booking?.status}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
