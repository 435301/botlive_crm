import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../config/config";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";

export const subAdminLogin = createAsyncThunk(
    "skillCenterSchoolAdmin/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/skillCenterSchoolAdmin/login`, credentials);
            const data = response.data;

            if (!data.status || !data.data?.token) {
                toast.error(data.message);
                return rejectWithValue(data.message);
            }
            Cookies.set("sub-admin-token", data.data.token, {
                expires: 7, // 7 days
                secure: false, // if it is https set to true
                sameSite: "Strict",
            });

            Cookies.set("sub_admin", JSON.stringify(data.data), {
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
export const subAdminSendOtp = createAsyncThunk(
    "skillCenterSchoolAdmin/sendOtp",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/skillCenterSchoolAdmin/forgotPassword`, {
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
export const subAdminVerifyOtp = createAsyncThunk(
    "skillCenterSchoolAdmin/verifyOtp",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/skillCenterSchoolAdmin/verifyOtp`, {
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
export const subAdminResetPassword = createAsyncThunk(
    "skillCenterSchoolAdmin/resetPassword",
    async ({ email, newPassword, confirmPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/skillCenterSchoolAdmin/resetPassword`, {
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

const subAdminSlice = createSlice({
    name: "sub_admin",
    initialState: {
        loading: false,
        subAdmin: Cookies.get("sub_admin")
            ? JSON.parse(Cookies.get("sub_admin"))
            : null,
        token: Cookies.get("sub-admin-token") || null,
        error: null,
    },
    reducers: {
        logoutSubAdmin: (state) => {
            state.admin = null;
            state.token = null;
            Cookies.remove("sub_admin");
            Cookies.remove("sub-admin-token");
            toast.success("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(subAdminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(subAdminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
                state.token = action.payload.token;
            })
            .addCase(subAdminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(subAdminSendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(subAdminSendOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(subAdminSendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(subAdminVerifyOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(subAdminVerifyOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(subAdminVerifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(subAdminResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(subAdminResetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(subAdminResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export const { logoutSubAdmin } = subAdminSlice.actions;
export default subAdminSlice.reducer;