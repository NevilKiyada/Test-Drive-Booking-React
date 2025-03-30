




import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ShowroomList from './pages/ShowroomList';
import ShowroomDetails from './pages/ShowroomDetails';
import CarDetails from './pages/CarDetails';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/showrooms" element={<ShowroomList />} />
            <Route path="/showrooms/:id" element={<ShowroomDetails />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
}

export default App;