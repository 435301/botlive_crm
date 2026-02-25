import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

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