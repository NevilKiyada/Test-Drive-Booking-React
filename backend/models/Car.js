


const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    showroom: { type: mongoose.Schema.Types.ObjectId, ref: "Showroom", required: true }, // Car belongs to a showroom
    model: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true }, // True if available for booking
    testDriveAvailability: { type: Boolean, default: true }, // True if available for test drives
    imageUrl: { type: String, default: "" }, // Image of the car
    description: { type: String, default: "No description available." }, // Description of the car
    transmission: { type: String, default: "N/A" }, // Transmission type
    fuelType: { type: String, default: "N/A" }, // Fuel type
    engine: { type: String, default: "N/A" }, // Engine details
    power: { type: String, default: "N/A" }, // Power details
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // Stores test drive bookings
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
