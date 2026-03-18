import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getAdminRole, isStudentAuthenticated, getStudentRole, isSubAdminAuthenticated, getSubAdminRole, isTrainerAuthenticated, getTrainerRole } from "../utils/auth";

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
  // check sub admin login
  if (!role && isSubAdminAuthenticated()) {
    role = getSubAdminRole();
  }
  // check trainer login
  if (!role && isTrainerAuthenticated()) {
    role = getTrainerRole();
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