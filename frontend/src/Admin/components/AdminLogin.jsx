import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slices/userSlice";
import ReCAPTCHA from "react-google-recaptcha";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.User);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      toast.error("Please verify you are not a robot!");
      return;
    }

    const formData = {
      email,
      password,
      recaptchaToken, // Send reCAPTCHA token to backend
    };

    try {
      dispatch(login(formData, "admin"));
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      navigate("/admin-dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="flex-1 flex flex-col justify-center items-center p-10 text-white bg-yellow-500 relative">
          <img src="/logo.jpeg" alt="Logo" width={100} className="mb-4" />
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg text-center mt-2">Sign in to manage your admin dashboard.</p>
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        <div className="flex-1 p-8 bg-white">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Sign In</h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* reCAPTCHA Component */}
            <ReCAPTCHA
              sitekey="6LcMSPAqAAAAAAudFyKGyWpZ1Ml0gIQr1E9Ptkmy" 
              onChange={(token) => setRecaptchaToken(token)}
            />

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            <Link to="/" className="text-yellow-600 hover:underline">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
