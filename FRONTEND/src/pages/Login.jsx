

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext); // Context for authentication
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Ensures cookies are sent with the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save user info in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);

      setUser(data.user); // ✅ Update global user state for Navbar update

      toast.success('Login successful!');

      // Redirect based on role
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col justify-center items-center bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Login;
