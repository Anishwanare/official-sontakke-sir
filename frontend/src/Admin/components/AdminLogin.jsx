import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../store/slices/userSlice";

const AdminLogin = () => {
  // console.log("anish")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.User)
  const navigate = useNavigate()
  const { isAuthenticated,user } = useSelector((state) => state.User)

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)

    try {
      dispatch(login(formData, 'admin'))
    } catch (error) {
      toast.error(error)
    } finally {
      setEmail('');
      setPassword('')
    }
  };

  useEffect(()=>{
    if(isAuthenticated && user?.role === "Admin"){
      navigate("/admin-dashboard")
    }
  })


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <Link to={"/"} className="absolute top-32 left-64 text-blue-500 hover:underline">{'< Home'}</Link>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex gap-5 flex-col">

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {loading ? 'loading....' : 'Login'}
            </button>
            <Link to={"/"}>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
