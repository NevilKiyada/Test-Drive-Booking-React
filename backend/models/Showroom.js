


const mongoose = require("mongoose");

const showroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Admin who owns showroom
    image: { type: String, required: true }, // Showroom image
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model("Showroom", showroomSchema);
