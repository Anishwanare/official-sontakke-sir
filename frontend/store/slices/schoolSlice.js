import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const schoolSlice = createSlice({
    name: "school",
    initialState: {
        schools: [],
        loading: false,
        error: null,
    },
    reducers: {
        updateSchoolRequest(state) {
            state.loading = true;
        },
        updateSchoolSuccess(state) {
            state.loading = false;
        },
        updateSchoolFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
        },
        fetchSchoolsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSchoolsSuccess(state, action) {
            state.loading = false;
            state.schools = action.payload || [];
        },
        fetchSchoolsFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error || "Failed to fetch schools";
        },
        deleteSchoolRequest(state) {
            state.loading = true;
        },
        deleteSchoolSuccess(state, action) {
            state.loading = false;
            state.schools = state.schools.filter(school => school._id !== action.payload);
        },
        deleteSchoolFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error || "Failed to delete school";
        },
    },
});

export const updateSchool = (id, formData) => async (dispatch) => {
    dispatch(schoolSlice.actions.updateSchoolRequest());
    try {
        await axios.put(
            `${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/edit-school/${id}`,
            formData,
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        dispatch(schoolSlice.actions.updateSchoolSuccess());
        dispatch(fetchSchools())
        toast.success("School updated successfully!");
    } catch (error) {
        dispatch(schoolSlice.actions.updateSchoolFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "Failed to update school");
    }
};

export const fetchSchools = () => async (dispatch) => {
    dispatch(schoolSlice.actions.fetchSchoolsRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/get-schools`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
        if(response.data.success){
            dispatch(schoolSlice.actions.fetchSchoolsSuccess(response.data?.schools));
        }
    } catch (error) {
        dispatch(schoolSlice.actions.fetchSchoolsFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "An error occurred while fetching schools");
    }
};

export const deleteSchool = (id) => async (dispatch) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this school?");
    if (!confirmDelete) return;

    dispatch(schoolSlice.actions.deleteSchoolRequest());
    try {
        await axios.delete(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/delete-school/${id}`, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
        dispatch(schoolSlice.actions.deleteSchoolSuccess(id));
        dispatch(fetchSchools())
        toast.success("School deleted successfully!");
    } catch (error) {
        dispatch(schoolSlice.actions.deleteSchoolFailed({ error: error.response?.data?.message }));
        toast.error(error.response?.data?.message || "Failed to delete school");
    }
};

export default schoolSlice.reducer;
