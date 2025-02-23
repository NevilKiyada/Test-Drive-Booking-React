import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ adminOnly, children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Assuming role is stored

  if (!token) {
    return <Navigate to="/login" />;
  }

  // If admin-only route but user is not admin, redirect
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
