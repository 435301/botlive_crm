import axios from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import { logoutAdmin } from "../redux/slices/adminSlice";

const axiosInstance = axios.create({
    baseURL: "http://192.168.29.251:8000",
    headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
    (config) => {
        const adminData = Cookies.get("super-admin");

        if (adminData) {
            const parsed = JSON.parse(adminData);
            const token = parsed?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }


        return config;
    },
    (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (!response) {
            console.error("Network error");
            return Promise.reject(error);
        }

        //  401 - Unauthorized
        if (response.status === 401) {
            console.warn("Unauthorized - Logging out");

            store.dispatch(logoutAdmin());
            Cookies.remove("super-admin");
            window.location.href = "/login";
        }

        //  403 - Forbidden
        if (response.status === 403) {
            console.warn("Forbidden - No Permission");
        }

        //  500 - Server Error
        if (response.status === 500) {
            console.error("Server error occurred");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;