import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const studentSlice = createSlice({
    name: "student",
    initialState: {
        students: [],
        loading: false,
        error: null
    },
    reducers: {
        updateStudentRequest(state) {
            state.loading = true
        },
        updateStudentSuccess(state) {
            state.loading = false
        },
        updateStudentFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
            state.error = action.payload?.error
        },
        fetchStudentsRequest(state) {
            state.loading = true
        },
        fetchStudentsSuccess(state, action) {
            state.loading = false;
            state.students = action.payload || []
        },
        fetchStudentsFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error;
            state.error = action.payload?.error
        },
        deleteStudentRequest(state) {
            state.loading = true
        },
        deleteStudentSuccess(state) {
            state.loading = true
        },
        deleteSchoolFailed(state, action) {
            state.loading = false;
            state.error = action.payload?.error
        },
        // registerStudentResponse(state, action) {
        //     state.loading = true;
        // },
        // registerStudentSuccess(state, action) {
        //     state.loading = false;
        // },
        // registerStudentFailed(state, action) {
        //     state.loading = false;
        //     state.error = action.payload?.error
        // },
    }
})


export const updateStudent = (id, student) => async (dispatch) => {
    dispatch(studentSlice.actions.updateStudentRequest());
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/update/student/${id}`,
            student,
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
            dispatch(studentSlice.actions.updateStudentSuccess())
            dispatch(fetchStudents())
            toast.success(response.data.message)
        }
    } catch (error) {
        dispatch(studentSlice.actions.updateStudentFailed());
        toast.error(error.response.data.message)

    }
}

export const fetchStudents = () => async (dispatch) => {
    // console.log("Fetching students...");
    dispatch(studentSlice.actions.fetchStudentsRequest());
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/get-students`,
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );
        if (response.data.success) {
            dispatch(studentSlice.actions.fetchStudentsSuccess(response.data.getStudent));
            toast.success(response.data.message || "Students fetched successfully!");
        } else {
            toast.error(response.data.message || "Failed to fetch students.");
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
        dispatch(studentSlice.actions.fetchStudentsFailed());
        toast.error(error.response?.data?.message || "An error occurred while fetching students.");
    }
};

export const deleteStudent = (id) => async (dispatch) => {
    dispatch(studentSlice.actions.deleteStudentRequest())
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/delete/student/${id}`,
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        if (data?.success) {
            dispatch(studentSlice.actions.deleteStudentSuccess());
            toast.success(data?.message)
            dispatch(fetchStudents())
        }
    } catch (error) {
        dispatch(studentSlice.actions.deleteSchoolFailed());
        toast.error(error?.data?.message)

    }
}


export default studentSlice.reducer