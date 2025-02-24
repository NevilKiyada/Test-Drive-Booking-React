// import React from 'react';

// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//           <span className="block">Test Drive Your Dream Car</span>
//           <span className="block text-primary-600">Book with Confidence</span>
//         </h1>
//         <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           Experience the thrill of driving your dream car. Book a test drive today at your nearest showroom.
//         </p>
//         <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
//           <div className="rounded-md shadow">
//             <Link
//               to="/showrooms"
//               className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
//             >
//               Browse Showrooms
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// function Home() {
//   return (
//     <div
//       className="relative w-full h-screen bg-cover bg-center"
//       style={{
//         backgroundImage:
//           "url('https://thumbs.dreamstime.com/b/elegant-car-dealership-backdrop-showroom-wall-mockup-hd-highlighting-innovation-behind-electric-hybrid-cars-294592877.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         marginTop: 0,
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
//         <motion.h1
//           className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <span className="block">Test Drive Your Dream Car</span>
//           <span className="block text-blue-500">Book with Confidence</span>
//         </motion.h1>

//         <motion.p
//           className="mt-4 max-w-xl mx-auto text-lg text-gray-200 sm:text-xl md:mt-6 md:max-w-2xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.5 }}
//         >
//           Experience the thrill of driving your dream car. Book a test drive
//           today at your nearest showroom and make your dream a reality.
//         </motion.p>

//         <motion.div
//           className="mt-6 max-w-md mx-auto sm:flex sm:justify-center md:mt-10"
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="rounded-md shadow-lg">
//             <Link
//               to="/showrooms"
//               className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
//             >
//               Browse Showrooms
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       <footer className="absolute bottom-0 w-full bg-gray-900 text-white text-center py-4">
//         &copy; {new Date().getFullYear()} CarTest. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Home;








import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect the current theme (light or dark)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    
    // Listen for theme changes
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: isDarkMode
          ? "url('https://thumbs.dreamstime.com/b/elegant-car-dealership-backdrop-showroom-wall-mockup-hd-highlighting-innovation-behind-electric-hybrid-cars-294592877.jpg')"
          : "url('https://thumbs.dreamstime.com/b/luxury-modern-car-showroom-white-wall-cars-mockup-hd-emphasizing-lineup-294592135.jpg')", // Replace with the light mode image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginTop: 0,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="block">Test Drive Your Dream Car</span>
          <span className="block text-blue-500">Book with Confidence</span>
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl mx-auto text-lg text-gray-200 sm:text-xl md:mt-6 md:max-w-2xl"
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
            <Link
              to="/showrooms"
              className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
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
