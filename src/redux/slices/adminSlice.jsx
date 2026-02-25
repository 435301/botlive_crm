import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export const adminLogin = createAsyncThunk(
    "admin/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            Cookies.set("adminToken", data.data.token, {
                expires: 7, // 7 days
                secure: false, // if it is https set to true
                sameSite: "Strict",
            });

            Cookies.set("admin", JSON.stringify(data.data), {
                expires: 7,
                secure: false,
                sameSite: "Strict",
            });

            toast.success(data.message);
            return data.data;
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// SEND OTP
export const sendOtp = createAsyncThunk(
    "admin/sendOtp",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/admin/forgotPassword`, {
                email,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// VERIFY OTP
export const verifyOtp = createAsyncThunk(
    "admin/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/verifyOtp`, {
                email,
                otp,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message = error.response?.data?.message || "OTP verification failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
    "admin/resetPassword",
    async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/admin/resetPassword`, {
                email,
                newPassword,
                confirmPassword,
            });

            const data = response.data;

            if (!data.status) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }

            toast.success(data.message);
            return data;
        } catch (error) {
            const message =
                error.response?.data?.message || "Password reset failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        admin: Cookies.get("admin")
            ? JSON.parse(Cookies.get("admin"))
            : null,
        token: Cookies.get("adminToken") || null,
        error: null,
    },
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            Cookies.remove("admin", {
                secure: false,  //change it to true later when https is enabled
                sameSite: "Strict",
            });

            Cookies.remove("adminToken", {
                secure: false,
                sameSite: "Strict",
            });
            toast.info("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
                state.token = action.payload.token;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;