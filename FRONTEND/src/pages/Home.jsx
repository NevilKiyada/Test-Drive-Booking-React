

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext"; // Use global theme context

function Home() {
  const { darkMode } = useTheme(); // Access dark mode state

  return (
    <div
      key={darkMode} // Forces re-render when theme changes
      className="relative w-full h-screen bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(${
          darkMode
            ? "https://thumbs.dreamstime.com/b/elegant-car-dealership-backdrop-showroom-wall-mockup-hd-highlighting-innovation-behind-electric-hybrid-cars-294592877.jpg"
            : "https://img.freepik.com/premium-photo/white-car-is-parked-showroom-with-other-cars_1249034-37974.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className={`text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 transition-all duration-300 ${
            darkMode ? "text-fuchsia-500" : "text-white"
          }`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="block">Test Drive Your Dream Car</span>
          <span
            className={`block transition-all duration-300 ${
              darkMode ? "text-blue-400" : "text-slate-500"
            }`}
          >
            Book with Confidence
          </span>
        </motion.h1>

        <motion.p
          className={`mt-4 max-w-xl mx-auto text-lg sm:text-xl md:mt-6 md:max-w-2xl transition-all duration-300 ${
            darkMode ? "text-gray-300" : "text-white"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Experience the thrill of driving your dream car. Book a test drive
          today at your nearest showroom and make your dream a reality.
        </motion.p>

        <motion.div
          className="mt-6 max-w-md mx-auto sm:flex sm:justify-center md:mt-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="rounded-md shadow-lg">
            {/* <Link
              to="/showrooms"
              className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-black bg-white hover:bg-slate-500  hover:text-white transition duration-300"
            >
              Browse Showrooms
            </Link> */}
            <Link
              to="/showrooms"
              className={`w-full flex items-center justify-center px-10 py-4 border text-lg font-semibold rounded-lg transition duration-300 ${
                darkMode
                  ? "text-white bg-fuchsia-500 hover:bg-blue-400 hover:text-black border-gray-600"
                  : "text-black bg-white hover:bg-slate-500 hover:text-white border-gray-300"
              }`}
            >
              Browse Showrooms
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
