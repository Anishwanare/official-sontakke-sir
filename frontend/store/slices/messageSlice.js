import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        error: null,
        messages: [],
        loading: false,
    },
    reducers: {
        fetchMessagesRequest(state) {
            state.loading = true;
        },
        fetchMessagesSuccess(state, action) {
            state.loading = false;
            state.messages = action.payload || []; // Ensure messages is always an array
        },
        fetchMessagesFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
    }
})

export const fetchMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.fetchMessagesRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/message/get`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
        if (response.data.success) {
            dispatch(messageSlice.actions.fetchMessagesSuccess(response.data?.messages));
            toast.success(response.data.message);
        } else {
            throw new Error("Failed to fetch messages");
        }
    } catch (error) {
        dispatch(messageSlice.actions.fetchMessagesFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "An error occurred");
    }
};

export default messageSlice.reducer