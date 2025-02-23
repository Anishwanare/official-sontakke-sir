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
            await dispatch(login({ schoolId, role: "school" }));
            setSchoolId(""); 
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <img src="/logo.jpeg" alt="Logo" className="mx-auto w-20 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800">School Login</h2>
                    <p className="text-gray-500">Enter your school ID to continue</p>
                </div>

                {/* Login Form */}
                <form onSubmit={schoolLoginHandler} className="space-y-5">
                    <div>
                        <label htmlFor="schoolId" className="block text-gray-700 font-medium mb-2">
                            School ID
                        </label>
                        <input
                            type="text"
                            id="schoolId"
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            placeholder="Enter your school ID"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Back to Home */}
                <div className="mt-5 text-center">
                    <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default SchoolLogin;
