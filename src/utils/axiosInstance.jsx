import axios from "axios";
import Cookies from "js-cookie";
import store from "../redux/store";
import { logoutAdmin } from "../redux/slices/adminSlice";
import { logoutStudent } from "../redux/slices/studentSlice";
import { logoutSubAdmin } from "../redux/slices/subAdminSlice";

const axiosInstance = axios.create({
    baseURL: "https://cyientfoundation.duckdns.org",
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
    (config) => {
        //  First check admin
        const adminData = Cookies.get("super-admin");

        if (adminData) {
            const parsed = JSON.parse(adminData);
            const token = parsed?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            }
        }
        // Then check student
        const studentData = Cookies.get("student");

        if (studentData) {
            const parsed = JSON.parse(studentData);
            const token = parsed?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

          //  check sub admin
        const subAdminData = Cookies.get("sub_admin");

        if (subAdminData) {
            const parsed = JSON.parse(subAdminData);
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

            //  Check which user is logged in
            if (Cookies.get("super-admin")) {
                store.dispatch(logoutAdmin());
                Cookies.remove("super-admin");
                window.location.href = "/login";
            }

            if (Cookies.get("student")) {
                store.dispatch(logoutStudent());
                Cookies.remove("student");
                window.location.href = "/student/login";
            }

             if (Cookies.get("sub_admin")) {
                store.dispatch(logoutSubAdmin());
                Cookies.remove("sub_admin");
                window.location.href = "/admin/login";
            }
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