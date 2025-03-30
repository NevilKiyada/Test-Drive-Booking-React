







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
