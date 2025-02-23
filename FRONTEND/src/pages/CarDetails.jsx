// import React from 'react';
// import { useParams } from 'react-router-dom';

// // Dummy data for a car
// const car = {
//   id: 1,
//   name: 'BMW M4 Competition',
//   brand: 'BMW',
//   year: 2024,
//   price: 74900,
//   transmission: 'Automatic',
//   fuelType: 'Petrol',
//   engine: '3.0L Twin-Turbo Inline-6',
//   power: '503 hp',
//   image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
//   description: 'Experience the thrill of BMW M4 Competition with its powerful engine and precise handling.',
// };

// function CarDetails() {
//   const { id } = useParams();

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
//           <div className="relative">
//             <img
//               src={car.image}
//               alt={car.name}
//               className="w-full rounded-lg shadow-lg object-cover"
//             />
//           </div>

//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">{car.name}</h1>
//             <div className="mt-3">
//               <p className="text-3xl tracking-tight text-gray-900">${car.price.toLocaleString()}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <p className="text-base text-gray-700">{car.description}</p>
//             </div>

//             <div className="mt-8 border-t border-gray-200 pt-8">
//               <h3 className="text-sm font-medium text-gray-900">Specifications</h3>

//               <div className="mt-4 space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Brand</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.brand}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Year</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.year}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Transmission</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.transmission}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.fuelType}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Engine</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.engine}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Power</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.power}</dd>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 type="button"
//                 className="btn-primary w-full"
//               >
//                 Book Test Drive
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function CarDetails() {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState(""); // For success/error messages

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${id}`);
//         if (!response.ok) {
//           throw new Error("Car not found");
//         }
//         const data = await response.json();
//         setCar(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   const handleBookTestDrive = async () => {
//     setMessage(""); // Clear previous messages

//     const userId = "67a1ef0833ccc7b329214661"; // Replace with actual logged-in user ID
//     const showroomId = car.showroom; // Car already has showroom ID

//     const requestBody = {
//       carId: id,
//       userId,
//       showroomId,
//       date: new Date().toISOString(), // Use current date/time or let user pick
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/bookings/book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("Test drive booked successfully! 🎉");
//       } else {
//         setMessage(`Error: ${data.message}`);
//       }
//     } catch (err) {
//       setMessage("Failed to book test drive. Please try again.");
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading car details...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
//           <div className="relative">
//             <img
//               src={car.imageUrl || "https://via.placeholder.com/600"}
//               alt={car.model}
//               className="w-full rounded-lg shadow-lg object-cover"
//             />
//           </div>

//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">{car.model}</h1>
//             <p className="text-lg text-gray-600 mt-2">{car.brand} - {car.year}</p>
//             <div className="mt-3">
//               <p className="text-3xl tracking-tight text-gray-900">${car.price.toLocaleString()}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <p className="text-base text-gray-700">{car.description || "No description available."}</p>
//             </div>

//             <div className="mt-8 border-t border-gray-200 pt-8">
//               <h3 className="text-sm font-medium text-gray-900">Specifications</h3>

//               <div className="mt-4 space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Transmission</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.transmission || "N/A"}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.fuelType || "N/A"}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Engine</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.engine || "N/A"}</dd>
//                   </div>
//                   <div>
//                     <dt className="text-sm font-medium text-gray-500">Power</dt>
//                     <dd className="mt-1 text-sm text-gray-900">{car.power || "N/A"}</dd>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 type="button"
//                 className="btn-primary w-full"
//                 onClick={handleBookTestDrive}
//               >
//                 Book Test Drive
//               </button>
//               {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarDetails;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// function CarDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bookingDate, setBookingDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [bookingLoading, setBookingLoading] = useState(false);

//   // Fetch Car Details
//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${id}`);
//         if (!response.ok) throw new Error("Car not found");
//         const data = await response.json();
//         setCar(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [id]);

  // Handle Test Drive Booking
  // const handleBooking = async () => {
  //   if (!bookingDate || !timeSlot) {
  //     alert("Please select a date and time slot.");
  //     return;
  //   }
  //   if (!user?._id) {
  //     alert("Please log in to book a test drive.");
  //     return;
  //   }

  //   // const bookingDateTime = new Date(`${bookingDate}T${timeSlot}:00.000Z`);
  //   const bookingDateTime = new Date(`${bookingDate}T${timeSlot}:00`);
  //   setBookingLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:5000/api/bookings/book", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         carId: car._id,
  //         userId: user._id,
  //         showroomId: car.showroom,
  //         date: bookingDateTime,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to book test drive");
  //     }

  //     alert("Test drive booked successfully! 🎉");
  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setBookingLoading(false);
  //   }
  // };




//   const handleBooking = async () => {
//     if (!bookingDate || !timeSlot) {
//       alert("Please select a date and time slot.");
//       return;
//     }
//     if (!user?._id) {
//       alert("Please log in to book a test drive.");
//       return;
//     }
  
//     const bookingDateTime = new Date(`${bookingDate}T${timeSlot}:00`);
  
//     setBookingLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/bookings/book", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           carId: car._id,
//           userId: user._id,
//           showroomId: car.showroom,
//           date: bookingDateTime.toISOString(),
//           timeSlot: timeSlot, // This line is critical
//         }),
//       });
  
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to book test drive");
//       }
  
//       alert("Test drive booked successfully! 🎉");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setBookingLoading(false);
//     }
//   };
  

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading car details...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
//           {/* Car Image */}
//           <div className="relative">
//             <img
//               src={car.imageUrl || "https://via.placeholder.com/600"}
//               alt={car.model}
//               className="w-full rounded-lg shadow-lg object-cover"
//             />
//           </div>

//           {/* Car Details */}
//           <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               {car.model}
//             </h1>
//             <p className="text-lg text-gray-600 mt-2">
//               {car.brand} - {car.year}
//             </p>
//             <p className="text-3xl tracking-tight text-gray-900 mt-3">
//               ${car.price.toLocaleString()}
//             </p>
//             <p className="text-base text-gray-700 mt-6">
//               {car.description || "No description available."}
//             </p>

//             {/* Car Specifications */}
//             <div className="mt-8 border-t border-gray-200 pt-8">
//               <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
//               <div className="grid grid-cols-2 gap-4 mt-4">
//                 <div>
//                   <dt className="text-sm font-medium text-gray-500">Transmission</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{car.transmission || "N/A"}</dd>
//                 </div>
//                 <div>
//                   <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{car.fuelType || "N/A"}</dd>
//                 </div>
//                 <div>
//                   <dt className="text-sm font-medium text-gray-500">Engine</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{car.engine || "N/A"}</dd>
//                 </div>
//                 <div>
//                   <dt className="text-sm font-medium text-gray-500">Power</dt>
//                   <dd className="mt-1 text-sm text-gray-900">{car.power || "N/A"}</dd>
//                 </div>
//               </div>
//             </div>

//             {/* Booking Form */}
//             <div className="mt-6">
//               <label className="block text-sm font-medium text-gray-700">Select Date</label>
//               <input
//                 type="date"
//                 value={bookingDate}
//                 onChange={(e) => setBookingDate(e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//                 min={new Date().toISOString().split("T")[0]}
//               />
//             </div>

//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
//               <select
//                 value={timeSlot}
//                 onChange={(e) => setTimeSlot(e.target.value)}
//                 className="w-full mt-1 p-2 border rounded"
//               >
//                 <option value="">Select a time slot</option>
//                 <option value="10:00">10 AM - 12 PM</option>
//                 <option value="14:00">2 PM - 4 PM</option>
//                 <option value="16:00">4 PM - 6 PM</option>
//               </select>
//             </div>

//             <div className="mt-6">
//               <button
//                 type="button"
//                 className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${
//                   bookingLoading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 onClick={handleBooking}
//                 disabled={bookingLoading}
//               >
//                 {bookingLoading ? "Booking..." : "Book Test Drive"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


// function CarDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [bookingDate, setBookingDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [bookingLoading, setBookingLoading] = useState(false);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/cars/${id}`);
//         if (!response.ok) throw new Error("Car not found");
//         const data = await response.json();
//         setCar(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleBooking = async () => {
//     if (!bookingDate || !timeSlot) {
//       alert("Please select a date and time slot.");
//       return;
//     }
//     if (!user?._id) {
//       alert("Please log in to book a test drive.");
//       return;
//     }

//     const bookingDateTime = new Date(`${bookingDate}T${timeSlot}:00`);

//     setBookingLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/bookings/book", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           carId: car._id,
//           userId: user._id,
//           showroomId: car.showroom,
//           date: bookingDateTime.toISOString(),
//           timeSlot: timeSlot,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to book test drive");
//       }

//       alert("Test drive booked successfully! 🎉");
//       navigate("/dashboard");
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading car details...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div className="bg-white dark:bg-gray-900 min-h-screen pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
//         {/* Car Image */}
//         <div className="relative">
//           <img
//             src={car.imageUrl || "https://via.placeholder.com/600"}
//             alt={car.model}
//             className="w-full rounded-lg shadow-lg object-cover"
//           />
//         </div>

//         {/* Car Details */}
//         <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {car.model}
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
//             {car.brand} - {car.year}
//           </p>
//           <p className="text-3xl tracking-tight text-gray-900 dark:text-white mt-3">
//             ${car.price.toLocaleString()}
//           </p>
//           <p className="text-base text-gray-700 dark:text-gray-300 mt-6">
//             {car.description || "No description available."}
//           </p>

//           {/* Car Specifications */}
//           <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
//             <h3 className="text-sm font-medium text-gray-900 dark:text-white">Specifications</h3>
//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Transmission</dt>
//                 <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.transmission || "N/A"}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Fuel Type</dt>
//                 <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.fuelType || "N/A"}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Engine</dt>
//                 <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.engine || "N/A"}</dd>
//               </div>
//               <div>
//                 <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Power</dt>
//                 <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.power || "N/A"}</dd>
//               </div>
//             </div>
//           </div>

//           {/* Booking Form */}
//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Date</label>
//             <input
//               type="date"
//               value={bookingDate}
//               onChange={(e) => setBookingDate(e.target.value)}
//               className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//               min={new Date().toISOString().split("T")[0]}
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Time Slot</label>
//             <select
//               value={timeSlot}
//               onChange={(e) => setTimeSlot(e.target.value)}
//               className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//             >
//               <option value="">Select a time slot</option>
//               <option value="10:00">10 AM - 12 PM</option>
//               <option value="14:00">2 PM - 4 PM</option>
//               <option value="16:00">4 PM - 6 PM</option>
//             </select>
//           </div>

//           <div className="mt-6">
//             <button
//               type="button"
//               className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${bookingLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//               onClick={handleBooking}
//               disabled={bookingLoading}
//             >
//               {bookingLoading ? "Booking..." : "Book Test Drive"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CarDetails;








import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${id}`);
        if (!response.ok) throw new Error("Car not found");
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleBooking = async () => {
    if (!bookingDate || !timeSlot) {
      toast.warn("Please select a date and time slot.");
      return;
    }
    if (!user?._id) {
      toast.error("Please log in to book a test drive.");
      return;
    }

    const bookingDateTime = new Date(bookingDate);
    bookingDateTime.setHours(parseInt(timeSlot.split(":" )[0]), 0, 0);

    setBookingLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/bookings/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car._id,
          userId: user._id,
          showroomId: car.showroom,
          date: bookingDateTime.toISOString(),
          timeSlot: timeSlot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to book test drive");
      }

      toast.success("Test drive booked successfully! 🎉");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading car details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="relative">
          <img src={car.imageUrl || "https://via.placeholder.com/600"} alt={car.model} className="w-full rounded-lg shadow-lg object-cover" />
        </div>
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{car.model}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{car.brand} - {car.year}</p>
          <p className="text-3xl text-gray-900 dark:text-white mt-3">${car.price.toLocaleString()}</p>
          <p className="text-base text-gray-700 dark:text-gray-300 mt-6">{car.description || "No description available."}</p>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Specifications</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div><dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Transmission</dt><dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.transmission || "N/A"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Fuel Type</dt><dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.fuelType || "N/A"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Engine</dt><dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.engine || "N/A"}</dd></div>
              <div><dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Power</dt><dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{car.power || "N/A"}</dd></div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Date</label>
            <DatePicker selected={bookingDate} onChange={(date) => setBookingDate(date)} dateFormat="MMMM d, yyyy" minDate={new Date()} className="w-full mt-2 p-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" placeholderText="Select a date" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Time Slot</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["10:00", "14:00", "16:00"].map((slot) => (
                <button key={slot} className={`px-4 py-2 rounded-lg border text-sm ${timeSlot === slot ? "bg-blue-500 text-white border-blue-500" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"}`} onClick={() => setTimeSlot(slot)}>
                  {slot === "10:00" ? "10 AM - 12 PM" : slot === "14:00" ? "2 PM - 4 PM" : "4 PM - 6 PM"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition ${bookingLoading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={handleBooking} disabled={bookingLoading}>{bookingLoading ? "Booking..." : "Book Test Drive"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
