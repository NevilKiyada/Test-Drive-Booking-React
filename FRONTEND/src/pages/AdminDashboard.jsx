


import React, { useState } from 'react';
import ShowroomManagement from '../components/ShowroomManagement';
import CarManagement from '../components/CarManagement';
import BookingManagement from '../components/BookingManagement';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('showrooms');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['showrooms', 'cars', 'bookings'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Render Components Based on Active Tab */}
      {activeTab === 'showrooms' && <ShowroomManagement />}
      {activeTab === 'cars' && <CarManagement />}
      {activeTab === 'bookings' && <BookingManagement />}
    </div>
  );
}

export default AdminDashboard;
