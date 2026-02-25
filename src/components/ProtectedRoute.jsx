import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getAdminRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
   if (allowedRoles) {
    const role = getAdminRole();
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/login" replace />;
    }
  }


  return children;
};

export default ProtectedRoute;