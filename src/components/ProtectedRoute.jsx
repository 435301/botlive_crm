import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getAdminRole, isStudentAuthenticated, getStudentRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles, loginPath = "/login" }) => {
  let role = null;
  
  //check super admin login
  if (isAuthenticated()) {
    role = getAdminRole();
  }
  // check student login
  if (!role && isStudentAuthenticated()) {
    role = getStudentRole();
  }
  if (!role) {
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

export default ProtectedRoute;