import React from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const rawUser = localStorage.getItem("user");
  const user = rawUser && rawUser !== "undefined" ? JSON.parse(rawUser) : null;

  
  if (!user && requiredRole) {
    alert("Please login first");
    return null;
  }


  if (requiredRole && user.role !== requiredRole) {
    alert("You don't have permission to visit this page");
    return null;
  }

  return children;
};

export default ProtectedRoute;