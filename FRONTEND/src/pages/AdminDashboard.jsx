// import React from 'react';
// import { useAuth } from '../contexts/AuthContext';

// function AdminDashboard() {
//   const { user } = useAuth();

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="py-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
//         <div className="mt-6">
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6">
//               <h2 className="text-lg font-medium text-gray-900">System Overview</h2>
//               <p className="mt-1 text-sm text-gray-500">Manage showrooms, cars, and bookings.</p>
//             </div>
//             <div className="border-t border-gray-200">
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
//                   <div className="mt-4 space-y-4">
//                     <button className="btn-primary w-full">Add New Showroom</button>
//                     <button className="btn-secondary w-full">Manage Cars</button>
//                     <button className="btn-secondary w-full">View Bookings</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// function AdminDashboard() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('showrooms');
//   const [showrooms, setShowrooms] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     email: '',
//     phone: '',
//     address: '',
//     image: '',
//   });

//   // Fetch all showrooms
//   useEffect(() => {
//     if (activeTab === 'showrooms') {
//       fetchShowrooms();
//     }
//   }, [activeTab]);

//   const fetchShowrooms = async () => {
//     try {
//       const res = await axios.get('/api/showrooms/all');
//       setShowrooms(res.data);
//     } catch (err) {
//       console.error('Failed to fetch showrooms:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddShowroom = async () => {
//     try {
//       const response = await axios.post('/api/showrooms/add', {
//         ...formData,
//         owner: user.userId,
//       });
//       alert(response.data.message);
//       fetchShowrooms();
//     } catch (error) {
//       alert('Failed to add showroom');
//       console.error(error);
//     }
//   };

//   const handleDeleteShowroom = async (id) => {
//     try {
//       await axios.delete(`/api/showrooms/delete/${id}`);
//       fetchShowrooms();
//     } catch (err) {
//       console.error('Failed to delete showroom:', err);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button className={`px-4 py-2 rounded ${activeTab === 'showrooms' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={() => setActiveTab('showrooms')}>Showrooms</button>
//         <button className={`px-4 py-2 rounded ${activeTab === 'cars' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={() => setActiveTab('cars')}>Cars</button>
//         <button className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
//       </div>

//       {/* Showroom Management */}
//       {activeTab === 'showrooms' && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Manage Showrooms</h2>

//           {/* Add Showroom Form */}
//           <div className="bg-white shadow p-4 rounded mb-6">
//             <h3 className="text-lg font-medium mb-3">Add New Showroom</h3>
//             <input className="w-full mb-2 p-2 border" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
//             <input className="w-full mb-2 p-2 border" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} />
//             <input className="w-full mb-2 p-2 border" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
//             <input className="w-full mb-2 p-2 border" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
//             <input className="w-full mb-2 p-2 border" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} />
//             <input className="w-full mb-2 p-2 border" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
//             <button onClick={handleAddShowroom} className="px-4 py-2 bg-green-600 text-white rounded">Add Showroom</button>
//           </div>

//           {/* Showroom List */}
//           <div className="bg-white shadow p-4 rounded">
//             <h3 className="text-lg font-medium mb-3">All Showrooms</h3>
//             <table className="w-full border">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-2">Name</th>
//                   <th className="p-2">Location</th>
//                   <th className="p-2">Email</th>
//                   <th className="p-2">Phone</th>
//                   <th className="p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {showrooms.map((showroom) => (
//                   <tr key={showroom._id} className="border-t">
//                     <td className="p-2">{showroom.name}</td>
//                     <td className="p-2">{showroom.location}</td>
//                     <td className="p-2">{showroom.email}</td>
//                     <td className="p-2">{showroom.phone}</td>
//                     <td className="p-2">
//                       <button onClick={() => handleDeleteShowroom(showroom._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Car Management */}
//       {activeTab === 'cars' && (
//         <div>
//           <h2 className="text-xl font-semibold">Car Management</h2>
//           <p className="text-gray-600">Coming soon...</p>
//         </div>
//       )}

//       {/* Booking Management */}
//       {activeTab === 'bookings' && (
//         <div>
//           <h2 className="text-xl font-semibold">Booking Management</h2>
//           <p className="text-gray-600">Coming soon...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// function AdminDashboard() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('showrooms');
//   const [showrooms, setShowrooms] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     email: '',
//     phone: '',
//     address: '',
//     image: '',
//   });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     if (activeTab === 'showrooms') {
//       fetchShowrooms();
//     }
//   }, [activeTab]);

//   const fetchShowrooms = async () => {
//     try {
//       const res = await axios.get('/api/showrooms/all');
//       setShowrooms(res.data);
//     } catch (err) {
//       console.error('Failed to fetch showrooms:', err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddOrUpdateShowroom = async () => {
//   if (!formData.name || !formData.location || !formData.email || !formData.phone || !formData.address || !formData.image) {
//     alert("All fields are required");
//     return;
//   }

//   try {
//     const owner = user.role === "admin" ? user._id : formData.owner;


//     if (editingId) {
//       const res = await axios.put(`/api/showrooms/update/${editingId}`, formData);
//       alert(res.data.message);
//     } else {
//       const res = await axios.post("/api/showrooms/add", { ...formData, owner });
//       alert(res.data.message);
//     }

//     resetForm();
//     fetchShowrooms();
//   } catch (error) {
//     alert("Failed to save showroom");
//     console.error(error.response?.data || error.message);
//   }
// };

  
//   const handleEditShowroom = (showroom) => {
//     setFormData({
//       name: showroom.name,
//       location: showroom.location,
//       email: showroom.email,
//       phone: showroom.phone,
//       address: showroom.address,
//       image: showroom.image,
//     });
//     setEditingId(showroom._id);
//   };

//   const handleDeleteShowroom = async (id) => {
//     if (window.confirm('Are you sure you want to delete this showroom?')) {
//       try {
//         await axios.delete(`/api/showrooms/delete/${id}`);
//         fetchShowrooms();
//       } catch (err) {
//         console.error('Failed to delete showroom:', err);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: '', location: '', email: '', phone: '', address: '', image: '' });
//     setEditingId(null);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${activeTab === 'showrooms' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
//           onClick={() => setActiveTab('showrooms')}
//         >
//           Showrooms
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${activeTab === 'cars' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
//           onClick={() => setActiveTab('cars')}
//         >
//           Cars
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
//           onClick={() => setActiveTab('bookings')}
//         >
//           Bookings
//         </button>
//       </div>

//       {/* Showroom Management */}
//       {activeTab === 'showrooms' && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Manage Showrooms</h2>

//           {/* Add/Edit Showroom Form */}
//           <div className="bg-white shadow p-4 rounded mb-6">
//             <h3 className="text-lg font-medium mb-3">{editingId ? 'Edit Showroom' : 'Add New Showroom'}</h3>
//             {['name', 'location', 'email', 'phone', 'address', 'image'].map((field) => (
//               <input
//                 key={field}
//                 className="w-full mb-2 p-2 border"
//                 name={field}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChange={handleInputChange}
//               />
//             ))}
//             <button
//               onClick={handleAddOrUpdateShowroom}
//               className="px-4 py-2 bg-green-600 text-white rounded mr-2"
//             >
//               {editingId ? 'Update' : 'Add'} Showroom
//             </button>
//             {editingId && (
//               <button onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded">
//                 Cancel Edit
//               </button>
//             )}
//           </div>

//           {/* Showroom List */}
//           <div className="bg-white shadow p-4 rounded">
//             <h3 className="text-lg font-medium mb-3">All Showrooms</h3>
//             <table className="w-full border">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="p-2">Name</th>
//                   <th className="p-2">Location</th>
//                   <th className="p-2">Email</th>
//                   <th className="p-2">Phone</th>
//                   <th className="p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {showrooms.map((showroom) => (
//                   <tr key={showroom._id} className="border-t">
//                     <td className="p-2">{showroom.name}</td>
//                     <td className="p-2">{showroom.location}</td>
//                     <td className="p-2">{showroom.email}</td>
//                     <td className="p-2">{showroom.phone}</td>
//                     <td className="p-2 space-x-2">
//                       <button
//                         onClick={() => handleEditShowroom(showroom)}
//                         className="px-2 py-1 bg-yellow-500 text-white rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteShowroom(showroom._id)}
//                         className="px-2 py-1 bg-red-600 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Car Management */}
//       {activeTab === 'cars' && (
//         <div>
//           <h2 className="text-xl font-semibold">Car Management</h2>
//           <p className="text-gray-600">Coming soon...</p>
//         </div>
//       )}

//       {/* Booking Management */}
//       {activeTab === 'bookings' && (
//         <div>
//           <h2 className="text-xl font-semibold">Booking Management</h2>
//           <p className="text-gray-600">Coming soon...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;


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
