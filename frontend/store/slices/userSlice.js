import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
    name: "User",
    initialState: {
        user: {},
        messages: [],
        loading: false,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        fetchUserRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
        },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.user || {};
        },
        fetchUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload?.error || "Authentication failed";
        },
        logoutRequest(state) {
            state.loading = true;
        },
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error || "Logout failed";
        },
    },
});


export const login = (data, role) => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    console.log(role)
    let url;

    if (role === "admin") url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/login`
    if (role === 'school') url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/login`;
    if (role === 'student') url = `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/login`;

    try {
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(userSlice.actions.fetchUserSuccess(response?.data));
        toast.success(response.data?.message);
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed({ error: error.response?.data?.message || "Something went wrong!" }));
        toast.error(error.response?.data?.message || "An error occurred");
    }
};

export const fetchSchoolProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/fetch-me`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        dispatch(userSlice.actions.fetchUserSuccess(response?.data));
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed({ error: error.response?.data?.message || "Failed to fetch profile" }));
    }
};

export const fetchStudentProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/fetch-me`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });

        dispatch(userSlice.actions.fetchUserSuccess(response?.data));
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed({ error: error.response?.data?.message || "Failed to fetch profile" }));
    }
};

export const fetchAdminProfile = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/fetch/me`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        dispatch(userSlice.actions.fetchUserSuccess(response?.data));
    } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed({ error: error.response?.data?.message || "Failed to fetch admin profile" }));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(userSlice.actions.logoutRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/logout`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        if (response.data.success) {
            dispatch(userSlice.actions.logoutSuccess());
            toast.success(response.data.message);
        } else {
            throw new Error("Logout failed");
        }
    } catch (error) {
        dispatch(userSlice.actions.logoutFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "An error occurred");
    }
};

export default userSlice.reducer;
