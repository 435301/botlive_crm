import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "./tokenExpiry";

//super admin
export const getAdminToken = () => {
  const adminData = Cookies.get("super-admin");
  if (!adminData) return null;
  const parsed = JSON.parse(adminData);
  return parsed?.token;
};

export const isAuthenticated = () => {
  const token = getAdminToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    Cookies.remove("super-admin");
    return false;
  }

  return true;
};


export const getAdminRole = () => {
  const token = getAdminToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};


//student

export const getStudentToken = () => {
  const adminData = Cookies.get("student");
  if (!adminData) return null;

  const parsed = JSON.parse(adminData);
  return parsed?.token;
};

export const isStudentAuthenticated = () => {
  const token = getStudentToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    Cookies.remove("student");
    return false;
  }

  return true;
};

export const getStudentRole = () => {
  const token = getStudentToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};

//sub admin

export const getSubAdminToken = () => {
  const adminData = Cookies.get("sub_admin");
  if (!adminData) return null;

  const parsed = JSON.parse(adminData);
  return parsed?.token;
};

export const isSubAdminAuthenticated = () => {
  const token = getSubAdminToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    Cookies.remove("sub_admin");
    return false;
  }

  return true;
};

export const getSubAdminRole = () => {
  const token = getSubAdminToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};


//trainer

export const getTrainerToken = () => {
  const adminData = Cookies.get("trainer");
  if (!adminData) return null;

  const parsed = JSON.parse(adminData);
  return parsed?.token;
};

export const isTrainerAuthenticated = () => {
  const token = getTrainerToken();
  if (!token) return false;

  if (isTokenExpired(token)) {
    Cookies.remove("trainer");
    return false;
  }

  return true;
};

export const getTrainerRole = () => {
  const token = getTrainerToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};