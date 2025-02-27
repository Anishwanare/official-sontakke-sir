import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const StudentLogin = () => {
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStudentLogin = (e) => {
        e.preventDefault();

        if (!phone.trim()) {
            toast.error("Phone number is required.");
            return;
        }

        try {
            dispatch(login({phone}, "student"));
            setPhone("");
            navigate("/student-dashboard");
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
                    <h2 className="text-3xl font-bold text-gray-800">Student Login</h2>
                    <p className="text-gray-500">Enter your registered phone number</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleStudentLogin} className="space-y-5">
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Login
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

export default StudentLogin;