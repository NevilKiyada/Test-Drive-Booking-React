// import React from 'react';

// function CarManagement() {
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Car Management</h2>
//       <p className="text-gray-600">Car management functionality coming soon...</p>
//     </div>
//   );
// }

// export default CarManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [formData, setFormData] = useState({
    showroom: "",
    model: "",
    brand: "",
    year: "",
    price: "",
    availability: true,
    imageUrl: "",
    description: "",
    transmission: "",
    fuelType: "",
    engine: "",
    power: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCars();
    fetchShowrooms();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("/api/cars/all");
      setCars(res.data);
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    }
  };

  const fetchShowrooms = async () => {
    try {
      const res = await axios.get("/api/showrooms/all");
      setShowrooms(res.data);
    } catch (err) {
      console.error("Failed to fetch showrooms:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleAddOrUpdateCar = async () => {
    if (
      !formData.showroom ||
      !formData.model ||
      !formData.brand ||
      !formData.year ||
      !formData.price
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/cars/update/${editingId}`, formData);
        alert("Car updated successfully!");
      } else {
        await axios.post("/api/cars/add", formData);
        alert("Car added successfully!");
      }
      resetForm();
      fetchCars();
    } catch (err) {
      console.error("Failed to save car:", err);
      alert("Failed to save car.");
    }
  };

  const handleEditCar = (car) => {
    setFormData({ ...car, showroom: car.showroom._id });
    setEditingId(car._id);
  };

  const handleDeleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`/api/cars/delete/${id}`);
        fetchCars();
      } catch (err) {
        console.error("Failed to delete car:", err);
        alert("Failed to delete car.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      showroom: "",
      model: "",
      brand: "",
      year: "",
      price: "",
      availability: true,
      imageUrl: "",
      description: "",
      transmission: "",
      fuelType: "",
      engine: "",
      power: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Car Management</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <select
          name="showroom"
          value={formData.showroom}
          onChange={handleInputChange}
          className="p-2 border rounded"
          required
        >
          <option value="" >Select Showroom</option>
          {showrooms.map((showroom) => (
            <option  className='bg-white dark:bg-gray-800' key={showroom._id} value={showroom._id}>
              {showroom.name} - {showroom.location}
            </option>
          ))}
        </select> */}

        <select
          name="showroom"
          value={formData.showroom}
          onChange={handleInputChange}
          className="p-2 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="" className="bg-white dark:bg-gray-800">
            Select Showroom
          </option>
          {showrooms.map((showroom) => (
            <option key={showroom._id} value={showroom._id}>
              {showroom.name} - {showroom.location}
            </option>
          ))}
        </select>

        {[
          "model",
          "brand",
          "year",
          "price",
          "imageUrl",
          "description",
          "transmission",
          "fuelType",
          "engine",
          "power",
        ].map((field) => (
          <input
            key={field}
            type={field === "year" || field === "price" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleInputChange}
            className="p-2 border rounded bg-white dark:bg-gray-800"
          />
        ))}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleInputChange}
          />
          <span>Available</span>
        </label>

        <button
          onClick={handleAddOrUpdateCar}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {editingId ? "Update Car" : "Add Car"}
        </button>
        {editingId && (
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <table className="w-full border text-left mt-4">
        <thead>
          <tr className="bg-gray-400">
            <th className="p-2">Model</th>
            <th className="p-2">Brand</th>
            <th className="p-2">Year</th>
            <th className="p-2">Price</th>
            <th className="p-2">Showroom</th>
            <th className="p-2">Availability</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-t">
              <td className="p-2">{car.model}</td>
              <td className="p-2">{car.brand}</td>
              <td className="p-2">{car.year}</td>
              <td className="p-2">${car.price}</td>
              <td className="p-2">{car.showroom?.name || "N/A"}</td>
              <td className="p-2">{car.availability ? "Yes" : "No"}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEditCar(car)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCar(car._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarManagement;
