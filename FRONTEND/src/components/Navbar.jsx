// import { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useAuth } from '../contexts/AuthContext';
// import ThemeToggle from './ThemeToggle';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function Navbar() {
//   const { user, logout } = useAuth();

//   const navigation = [
//     { name: 'Home', href: '/', current: true },
//     { name: 'Showrooms', href: '/showrooms', current: false },
//     ...(user ? [{ name: 'Dashboard', href: '/dashboard', current: false }] : []),
//     ...(user?.role === 'admin' ? [{ name: 'Admin', href: '/admin', current: false }] : []),
//   ];

//   return (
//     <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex h-16 justify-between">
//               <div className="flex">
//                 <div className="flex flex-shrink-0 items-center">
//                   <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
//                     CarTest
//                   </Link>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={classNames(
//                         item.current
//                           ? 'border-primary-500 text-gray-900 dark:text-white'
//                           : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
//                         'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
//                 <ThemeToggle />
//                 {user ? (
//                   <Menu as="div" className="relative ml-3">
//                     <Menu.Button className="flex rounded-full bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
//                       <span className="sr-only">Open user menu</span>
//                       <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
//                         {user.email[0].toUpperCase()}
//                       </div>
//                     </Menu.Button>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-200"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <Menu.Item>
//                           {({ active }) => (
//                             <button
//                               onClick={logout}
//                               className={classNames(
//                                 active ? 'bg-gray-100 dark:bg-gray-600' : '',
//                                 'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200'
//                               )}
//                             >
//                               Sign out
//                             </button>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 ) : (
//                   <div className="space-x-4">
//                     <Link
//                       to="/login"
//                       className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 text-sm font-medium"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="bg-primary-500 text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium"
//                     >
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <div className="-mr-2 flex items-center sm:hidden">
//                 <ThemeToggle />
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as={Link}
//                   to={item.href}
//                   className={classNames(
//                     item.current
//                       ? 'bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-100'
//                       : 'border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white',
//                     'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
//                   )}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//             {!user && (
//               <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
//                 <div className="space-y-1">
//                   <Disclosure.Button
//                     as={Link}
//                     to="/login"
//                     className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
//                   >
//                     Login
//                   </Disclosure.Button>
//                   <Disclosure.Button
//                     as={Link}
//                     to="/register"
//                     className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
//                   >
//                     Register
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             )}
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

// export default Navbar;



// import { Fragment } from "react";
// import { Link } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useAuth } from "../contexts/AuthContext";
// import ThemeToggle from "./ThemeToggle";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function Navbar() {
//   const { user, logout } = useAuth();

//   const navigation = [
//     { name: "Home", href: "/", current: true },
//     { name: "Showrooms", href: "/showrooms", current: false },
//     ...(user ? [{ name: "Dashboard", href: "/dashboard", current: false }] : []),
//     ...(user?.role === "admin" ? [{ name: "Admin", href: "/admin", current: false }] : []),
//   ];

//   return (
//     <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex h-16 justify-between items-center">
//               {/* Left Side: Logo & Navigation Links */}
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
//                     CarTest
//                   </Link>
//                 </div>
//                 <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                   {navigation.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.href}
//                       className={classNames(
//                         item.current
//                           ? "border-primary-500 text-gray-900 dark:text-white"
//                           : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white",
//                         "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
//                       )}
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Side: Theme Toggle & User Authentication */}
//               <div className="hidden sm:flex sm:items-center space-x-4">
//                 <ThemeToggle />
//                 {user ? (
//                   // User is logged in: Show Profile Dropdown
//                   <Menu as="div" className="relative">
//                     <Menu.Button className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-2 text-sm focus:outline-none">
//                       <span className="sr-only">Open user menu</span>
//                       <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
//                         {user.email[0].toUpperCase()}
//                       </div>
//                     </Menu.Button>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-200"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <Menu.Item>
//                           {({ active }) => (
//                             <Link
//                               to="/dashboard"
//                               className={classNames(
//                                 active ? "bg-gray-100 dark:bg-gray-600" : "",
//                                 "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
//                               )}
//                             >
//                               Dashboard
//                             </Link>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <button
//                               onClick={logout}
//                               className={classNames(
//                                 active ? "bg-gray-100 dark:bg-gray-600" : "",
//                                 "block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200"
//                               )}
//                             >
//                               Sign out
//                             </button>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 ) : (
//                   // User not logged in: Show Login & Register buttons
//                   <div className="space-x-4">
//                     <Link
//                       to="/login"
//                       className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 text-sm font-medium"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="bg-primary-500 text-white hover:bg-primary-600 px-3 py-2 rounded-md text-sm font-medium"
//                     >
//                       Register
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <div className="-mr-2 flex sm:hidden">
//                 <ThemeToggle />
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu Panel */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as={Link}
//                   to={item.href}
//                   className={classNames(
//                     item.current
//                       ? "bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-100"
//                       : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white",
//                     "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
//                   )}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//             {!user && (
//               <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
//                 <div className="space-y-1">
//                   <Disclosure.Button
//                     as={Link}
//                     to="/login"
//                     className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
//                   >
//                     Login
//                   </Disclosure.Button>
//                   <Disclosure.Button
//                     as={Link}
//                     to="/register"
//                     className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white"
//                   >
//                     Register
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             )}
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }

// export default Navbar;


import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation(); // Get the current location

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    { name: "Showrooms", href: "/showrooms", current: location.pathname === "/showrooms" },
    ...(user ? [{ name: "Dashboard", href: "/dashboard", current: location.pathname === "/dashboard" }] : []),
    ...(user?.role === "admin" ? [{ name: "Admin", href: "/admin", current: location.pathname === "/admin" }] : []),
  ];

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow fixed w-full top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Left Side: Logo & Navigation Links */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <Link to="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    CarTest
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "border-blue-500 text-gray-900 dark:text-white"
                          : "border-transparent text-gray-500 dark:text-gray-300 hover:border-blue-300 hover:text-blue-700 dark:hover:text-blue-300",
                        "inline-flex items-center border-b-2 px-3 pt-1 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Side: Theme Toggle & User Authentication */}
              <div className="hidden sm:flex sm:items-center space-x-4">
                <ThemeToggle />
                {user ? (
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center rounded-full bg-blue-500 p-2 text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        {user.email[0].toUpperCase()}
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-600" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100 dark:bg-gray-600" : "",
                                "block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-500 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 px-4 py-2 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex sm:hidden">
                <ThemeToggle />
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-100"
                      : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-blue-700 dark:hover:text-blue-300",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {!user && (
              <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
                <div className="space-y-1">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 dark:hover:text-white"
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700 hover:text-blue-800 dark:hover:text-white"
                  >
                    Register
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
