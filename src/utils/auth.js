import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

//super admin
export const getAdminToken = () => {
  return Cookies.get("super-admin-token");
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
  return Cookies.get("student-token");
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