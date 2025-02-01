// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const userSlice = createSlice({
//     name: "User",
//     initialState: {
//         user: {},
//         loading: false,
//         authenticated: false,
//         error: null,
//     },
//     reducers: {
//         fetchUserResponse(state) {
//             state.loading = true;
//             state.authenticated = false
//         },
//         fetchUserSuccess(state, action) {
//             state.loading = false;
//             state.authenticated = true;
//             state.action = action.payload;
//         },
//         fetchUserReject(state, action) {
//             state.loading = false;
//             state.authenticated = false;
//         },
//     }
// })


// export const login = (data) => async (dispatch) => {
//     dispatch(userSlice.actions.fetchUserResponse())
//     try {
//         const response = await axios.post(
//             `${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/login`, data, { withCredentials: true, headers: { "Content-Type": "application/json" } }
//         );
//         dispatch(userSlice.actions.fetchUserSuccess(response?.data?.admin))
//         toast.success(response.data?.message)
//     } catch (error) {
//         dispatch((userSlice.actions.fetchUserReject()))
//         toast.error(error.response.data.message)
//     }
// }

// export default userSlice.reducer