import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SchoolLogin = () => {
    const [schoolId, setSchoolId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useSelector((state) => state.User);

    useEffect(() => {
        if (isAuthenticated && user?.role === "School") {
            navigate("/school-home");
        }
    }, [navigate, isAuthenticated, user?.role]);

    const schoolLoginHandler = async (e) => {
        e.preventDefault();

        if (!schoolId.trim()) {
            toast.error("School ID is required.");
            return;
        }

        try {
            await dispatch(login({ schoolId, role: "school" })); // Ensure correct format
            setSchoolId(""); // Reset only after successful login
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">School Login</h2>
                <form onSubmit={schoolLoginHandler} className="space-y-4">
                    <input
                        type="text"
                        value={schoolId}
                        onChange={(e) => setSchoolId(e.target.value)}
                        placeholder="Your school ID"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-600 hover:text-blue-800">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SchoolLogin;
