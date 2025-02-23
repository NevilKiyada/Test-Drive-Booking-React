// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (error) {
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   // For development/testing purposes, we'll simulate authentication
//   const login = async (email, password) => {
//     try {
//       // Simulated successful login
//       const mockUser = {
//         id: '1',
//         email,
//         role: email.includes('admin') ? 'admin' : 'user',
//       };
//       const mockToken = 'mock-jwt-token';
//       localStorage.setItem('token', mockToken);
//       setUser(mockUser);
//       return true;
//     } catch (error) {
//       throw new Error('Invalid credentials');
//     }
//   };

//   const register = async (userData) => {
//     try {
//       // Simulated successful registration
//       const mockUser = {
//         id: '1',
//         email: userData.email,
//         role: 'user',
//       };
//       const mockToken = 'mock-jwt-token';
//       localStorage.setItem('token', mockToken);
//       setUser(mockUser);
//       return true;
//     } catch (error) {
//       throw new Error('Registration failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
//  };



// import { createContext, useContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom"; // ✅ Redirect after logout

// export const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // ✅ For redirecting

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(JSON.parse(userData)); 
//       } catch (error) {
//         console.error("Invalid token:", error);
//         logout(); // ✅ Clear invalid data
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Login failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.user);
//       return true;
//     } catch (error) {
//       throw new Error(error.message || "Invalid credentials");
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Logout failed");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setUser(null);
//       navigate("/login"); // ✅ Redirect after logout
//     }
//   };

//   const value = { user, setUser, login, logout, loading };

//   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
// };

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message || "Invalid credentials");
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
