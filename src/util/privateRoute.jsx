import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.user);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.role;

  if (!user && !storedUser) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === "customer") return <Navigate to="/" />;
    else if (role === "seller") return <Navigate to="/seller/dashboard" />;
    else if (role === "admin") return <Navigate to="/admin/dashboard" />;
  }
  return <Outlet />; // Render the child components if authenticated
};
export default PrivateRoute;
