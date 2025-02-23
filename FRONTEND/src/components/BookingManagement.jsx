// import React from 'react';

// function BookingManagement() {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Booking Management</h2>
//       <p className="text-gray-600">Booking management functionality coming soon...</p>
//     </div>
//   );
// }

// export default BookingManagement;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Card, CardContent } from '../components/ui/Card';
// import { toast } from 'react-toastify';

// const BookingManagement = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get('/api/bookings/all');
//       setBookings(response.data);
//     } catch (error) {
//       toast.error('Failed to fetch bookings');
//     }
//   };

//   const updateBookingStatus = async (bookingId, status) => {
//     try {
//       await axios.put(`/api/bookings/update/${bookingId}`, { status });
//       toast.success(`Booking ${status}`);
//       fetchBookings();
//     } catch (error) {
//       toast.error('Failed to update booking');
//     }
//   };

//   const deleteBooking = async (bookingId) => {
//     if (!window.confirm('Are you sure you want to delete this booking?')) return;
//     try {
//       await axios.delete(`/api/bookings/cancel/${bookingId}`);
//       toast.success('Booking deleted successfully');
//       fetchBookings();
//     } catch (error) {
//       toast.error('Failed to delete booking');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {bookings.map((booking) => (
//           <Card key={booking._id} className="shadow-lg p-4">
//             <CardContent>
//               <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
//               <p><strong>Car:</strong> {booking.car?.brand} {booking.car?.model}</p>
//               <p><strong>Showroom:</strong> {booking.showroom?.name}</p>
//               <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> <span className={`font-semibold ${booking.status === 'Pending' ? 'text-yellow-500' : booking.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>{booking.status}</span></p>
//               <div className="flex gap-2 mt-3">
//                 {booking.status === 'Pending' && (
//                   <Button className="bg-green-500 text-white" onClick={() => updateBookingStatus(booking._id, 'Confirmed')}>
//                     Approve
//                   </Button>
//                 )}
//                 {booking.status !== 'Cancelled' && (
//                   <Button className="bg-red-500 text-white" onClick={() => updateBookingStatus(booking._id, 'Cancelled')}>
//                     Cancel
//                   </Button>
//                 )}
//                 <Button className="bg-gray-700 text-white" onClick={() => deleteBooking(booking._id)}>
//                   Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookingManagement;



// const express = require("express");
// const Booking = require("../models/Booking");
// const User = require("../models/User");
// const Car = require("../models/Car");
// const Showroom = require("../models/Showroom");

// const router = express.Router();

// // Create a new booking with time slot
// router.post("/book", async (req, res) => {
//   const { carId, userId, showroomId, date, timeSlot } = req.body;

//   try {
//     if (!carId || !userId || !showroomId || !date || !timeSlot) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const car = await Car.findById(carId);
//     if (!car) return res.status(404).json({ message: "Car not found" });
//     if (!car.testDriveAvailability) {
//       return res.status(400).json({ message: "Test drive unavailable" });
//     }

//     const showroom = await Showroom.findById(showroomId);
//     if (!showroom) return res.status(404).json({ message: "Showroom not found" });

//     const existingBooking = await Booking.findOne({ car: carId, user: userId, date, timeSlot });
//     if (existingBooking) {
//       return res.status(400).json({ message: "Booking already exists for this time slot" });
//     }

//     const newBooking = new Booking({
//       car: carId,
//       user: userId,
//       showroom: showroomId,
//       date,
//       timeSlot,
//     });

//     await newBooking.save();

//     car.bookings.push(newBooking._id);
//     await car.save();

//     res.status(201).json({ message: "Booking successful", booking: newBooking });
//   } catch (err) {
//     console.error("Error creating booking:", err);
//     res.status(500).json({ message: "Failed to create booking", error: err.message });
//   }
// });

// // Get all bookings
// router.get("/all", async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate("user", "name email phone")
//       .populate("car", "model brand price")
//       .populate("showroom", "name location");

//     res.status(200).json(bookings);
//   } catch (err) {
//     console.error("Error fetching bookings:", err);
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// });

// // Update booking status (admin only)
// router.patch("/update-status/:bookingId", async (req, res) => {
//   const { status } = req.body;
//   const validStatuses = ["Pending", "Confirmed", "Cancelled"];

//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const booking = await Booking.findByIdAndUpdate(req.params.bookingId, { status }, { new: true });
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: `Booking status updated to ${status}`, booking });
//   } catch (err) {
//     console.error("Error updating booking status:", err);
//     res.status(500).json({ message: "Failed to update booking status" });
//   }
// });

// // Cancel a booking
// router.delete("/cancel/:bookingId", async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     await Car.findByIdAndUpdate(booking.car, { $pull: { bookings: booking._id } });
//     await Booking.findByIdAndDelete(req.params.bookingId);

//     res.status(200).json({ message: "Booking canceled successfully" });
//   } catch (err) {
//     console.error("Error canceling booking:", err);
//     res.status(500).json({ message: "Failed to cancel booking" });
//   }
// });

// module.exports = router;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent } from '../components/ui/Card';
import { toast } from 'react-toastify';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/all');
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.patch(`/api/bookings/update-status/${bookingId}`, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking status');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`/api/bookings/cancel/${bookingId}`);
      toast.success('Booking deleted successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <Card key={booking._id} className="shadow-lg p-4">
            <CardContent>
              <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
              <p><strong>Car:</strong> {booking.car?.brand} {booking.car?.model}</p>
              <p><strong>Showroom:</strong> {booking.showroom?.name}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Time Slot:</strong> {booking.timeSlot || "N/A"}</p>
              <p><strong>Status:</strong> 
                <span className={`font-semibold ${booking.status === 'Pending' ? 'text-yellow-500' : booking.status === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                  {booking.status}
                </span>
              </p>
              <div className="flex gap-2 mt-3">
                {booking.status === 'Pending' && (
                  <Button className="bg-green-500 text-white" onClick={() => updateBookingStatus(booking._id, 'Confirmed')}>
                    Approve
                  </Button>
                )}
                {booking.status !== 'Cancelled' && (
                  <Button className="bg-red-500 text-white" onClick={() => updateBookingStatus(booking._id, 'Cancelled')}>
                    Cancel
                  </Button>
                )}
                <Button className="bg-gray-700 text-white" onClick={() => deleteBooking(booking._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;
