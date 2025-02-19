import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const coordinatorSlice = createSlice({
    name: "coordinator",
    initialState: {
        coordinators: [],
        loading: false,
        error: null
    },
    reducers: {
        fetchCoordinatorRequest(state) { state.loading = true },
        fetchCoordinatorSuccess(state, action) { state.loading = false; state.coordinators = action.payload || [] },
        fetchCoordinatorFailed(state, action) { state.loading = false; state.error = action.payload?.error },
    }
})

export const fetchCoordinators = () => async (dispatch) => {
    dispatch(coordinatorSlice.actions.fetchCoordinatorRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v4/coordinator/fetch`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
        dispatch(coordinatorSlice.actions.fetchCoordinatorSuccess(response.data?.coordinators));
        toast.success(response?.data?.message);
    } catch (error) {
        dispatch(coordinatorSlice.actions.fetchCoordinatorFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "An error occurred");
    }
};


export default coordinatorSlice.reducer