// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// function ShowroomManagement() {
//   const { user } = useAuth();
//   const [showrooms, setShowrooms] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '', location: '', email: '', phone: '', address: '', image: '',
//   });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchShowrooms();
//   }, []);

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
//     if (Object.values(formData).some((value) => !value)) {
//       alert("All fields are required");
//       return;
//     }
//     try {
//       const owner = user.role === 'admin' ? user._id : formData.owner;
//       if (editingId) {
//         await axios.put(`/api/showrooms/update/${editingId}`, { ...formData });
//         alert("Showroom updated successfully");
//       } else {
//         await axios.post("/api/showrooms/add", { ...formData, owner });
//         alert("Showroom added successfully");
//       }
//       resetForm();
//       fetchShowrooms();
//     } catch (error) {
//       alert("Failed to save showroom");
//       console.error(error);
//     }
//   };

//   const handleEditShowroom = (showroom) => {
//     setFormData(showroom);
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
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Showroom Management</h2>
//       <div className="mb-6">
//         {['name', 'location', 'email', 'phone', 'address', 'image'].map((field) => (
//           <input
//             key={field}
//             className="w-full mb-2 p-2 border"
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             value={formData[field]}
//             onChange={handleInputChange}
//           />
//         ))}
//         <button
//           onClick={handleAddOrUpdateShowroom}
//           className="px-4 py-2 bg-green-600 text-white rounded mr-2"
//         >
//           {editingId ? 'Update' : 'Add'} Showroom
//         </button>
//         {editingId && (
//           <button onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded">
//             Cancel Edit
//           </button>
//         )}
//       </div>

//       <table className="w-full border text-left">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2">Name</th>
//             <th className="p-2">Location</th>
//             <th className="p-2">Email</th>
//             <th className="p-2">Phone</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {showrooms.map((showroom) => (
//             <tr key={showroom._id} className="border-t">
//               <td className="p-2">{showroom.name}</td>
//               <td className="p-2">{showroom.location}</td>
//               <td className="p-2">{showroom.email}</td>
//               <td className="p-2">{showroom.phone}</td>
//               <td className="p-2 space-x-2">
//                 <button
//                   onClick={() => handleEditShowroom(showroom)}
//                   className="px-2 py-1 bg-yellow-500 text-white rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteShowroom(showroom._id)}
//                   className="px-2 py-1 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ShowroomManagement;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ShowroomManagement() {
  const { user } = useAuth();
  const [showrooms, setShowrooms] = useState([]);
  const [formData, setFormData] = useState({
    name: '', location: '', email: '', phone: '', address: '', image: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchShowrooms();
  }, []);

  const fetchShowrooms = async () => {
    try {
      const res = await axios.get('/api/showrooms/all');
      setShowrooms(res.data);
    } catch (err) {
      console.error('Failed to fetch showrooms:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdateShowroom = async () => {
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
    );

    if (Object.values(trimmedData).some(value => value === '' || value === null || value === undefined)) {
      alert("All fields are required");
      console.log("Validation failed:", trimmedData);
      return;
    }

    try {
      const owner = user.role === 'admin' ? user._id : formData.owner;
      if (editingId) {
        await axios.put(`/api/showrooms/update/${editingId}`, { ...trimmedData });
        alert("Showroom updated successfully");
      } else {
        await axios.post("/api/showrooms/add", { ...trimmedData, owner });
        alert("Showroom added successfully");
      }
      resetForm();
      fetchShowrooms();
    } catch (error) {
      alert("Failed to save showroom");
      console.error(error);
    }
  };

  const handleEditShowroom = (showroom) => {
    setFormData(showroom);
    setEditingId(showroom._id);
  };

  const handleDeleteShowroom = async (id) => {
    if (window.confirm('Are you sure you want to delete this showroom?')) {
      try {
        await axios.delete(`/api/showrooms/delete/${id}`);
        fetchShowrooms();
      } catch (err) {
        console.error('Failed to delete showroom:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', location: '', email: '', phone: '', address: '', image: '' });
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Showroom Management</h2>
      <div className="mb-6">
        {['name', 'location', 'email', 'phone', 'address', 'image'].map((field) => (
          <input
            key={field}
            className="w-full mb-2 p-2 border bg-white dark:bg-gray-800"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleInputChange}
          />
        ))}
        <button
          onClick={handleAddOrUpdateShowroom}
          className="px-4 py-2 bg-green-600 text-white rounded mr-2"
        >
          {editingId ? 'Update' : 'Add'} Showroom
        </button>
        {editingId && (
          <button onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel Edit
          </button>
        )}
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-400">
            <th className="p-2">Name</th>
            <th className="p-2">Location</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showrooms.map((showroom) => (
            <tr key={showroom._id} className="border-t">
              <td className="p-2">{showroom.name}</td>
              <td className="p-2">{showroom.location}</td>
              <td className="p-2">{showroom.email}</td>
              <td className="p-2">{showroom.phone}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEditShowroom(showroom)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteShowroom(showroom._id)}
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

export default ShowroomManagement;




