import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

//super admin
export const getAdminToken = () => {
  const adminData = Cookies.get("super-admin");
  if (!adminData) return null;
  const parsed = JSON.parse(adminData);
  return parsed?.token;
};

export const isAuthenticated = () => {
  return !!getAdminToken();
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
  return !!getStudentToken();
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
  return !!getSubAdminToken();
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
  return !!getTrainerToken();
};

export const getTrainerRole = () => {
  const token = getTrainerToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};