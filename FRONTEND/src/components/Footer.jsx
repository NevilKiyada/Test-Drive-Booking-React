import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">CarTest</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Book test drives for luxury cars at your nearest showroom. Experience the thrill with confidence!
          </p>
        </div>

        {/* Middle Column: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/showrooms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
                Showrooms
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
                  Dashboard
                </Link>
              </li>
            )}
            {!user && (
              <>
                <li>
                  <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Column: Contact Information */}
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Contact Us</h3>
          <ul className="mt-2 space-y-2">
            <li>Email: <span className="text-gray-600 dark:text-gray-400">nevilkiyada04@gmail.com</span></li>
            <li>Phone: <span className="text-gray-600 dark:text-gray-400">+1 (800) 555-1234</span></li>
            <li>Location: <span className="text-gray-600 dark:text-gray-400">123 Auto Lane, Drive City, CA</span></li>
          </ul>
        </div> */}
         <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Contact Us</h3>
          <ul className="mt-2 space-y-2">
            <li>
              Email: <a href="mailto:nevilkiyada04@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">nevilkiyada04@gmail.com</a>
            </li>
            <li>
              Phone: <a href="tel:+917874689700" className="text-primary-600 dark:text-primary-400 hover:underline">+91 7874689700</a>
            </li>
            <li>
              Location: <a href="https://maps.app.goo.gl/9Q44YNruvspeQb6D9 " target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Bhakti Nager - Rajkot</a>
            </li>
          </ul>
        </div>
      </div>
     

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} CarTest. All rights reserved by Nevil Kiyada.
      </div>
    </footer>
  );
}

export default Footer;
