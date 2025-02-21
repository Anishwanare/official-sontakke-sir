import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import schoolReducer from "./slices/schoolSlice"
import studentReducer from "./slices/studentSlice"
import coordinatorReducer from "./slices/coordinatorSlice"
import messageReducer from "./slices/messageSlice"


export const store = configureStore({
    reducer: {
        User: userReducer,
        School: schoolReducer,
        Student: studentReducer,
        Coordinator: coordinatorReducer,
        Message:messageReducer
    }   
})