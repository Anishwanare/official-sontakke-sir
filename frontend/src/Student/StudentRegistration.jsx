import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchools } from "../../store/slices/schoolSlice";
import { fetchCoordinators } from "../../store/slices/coordinatorSlice";

const StudentRegistration = () => {
  const classes = [
    "Class - 1",
    "Class - 2",
    "Class - 3",
    "Class - 4",
    "Class - 5",
    "Class - 6",
    "Class - 7",
    // "Class - 8",
    // "Class - 9",
    // "Class - 10",
  ];

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // const [coordinators, setCoordinators] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    phone: "",
    villageName: "",
    talukka: "",
    district: "",
    role: "Student", // Default role
    school: "",
    className: "", // Added class field
    coordinator: "",
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // console.log("submitting")
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/register`,
        formData, { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (response?.data?.status) {
        toast.success("Student registered successfully!");
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          password: "",
          phone: "",
          villageName: "",
          talukka: "",
          district: "",
          role: "Student",
          school: "",
          className: "", 
          coordinator: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error submitting form: ", err); // Log the error to the console
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const dispatch = useDispatch()
  const { schools } = useSelector((state) => state.School)
  useEffect(() => {
    dispatch(fetchSchools())
  }, [dispatch]);

  const { coordinators } = useSelector((state) => state.Coordinator)
  // console.log(coordinators)
  useEffect(() => {
    dispatch(fetchCoordinators())
  }, [dispatch])



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md my-5">
        <div className="text-center p-2 text-2xl font-bold text-gray-700">
          Student Registration
        </div>
        <div className="flex justify-center mb-6">
          <img src="/logo.jpeg" alt="Logo" className="w-24 h-24" />
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="middleName" className="block text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              placeholder="Middle Name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school" className="block text-gray-700">
              Select School
            </label>
            <select
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            >
              <option value="" disabled>
                Select your school
              </option>
              {schools?.length > 0 ? (
                schools.map((school) => (
                  <option key={school._id} value={school.id}>
                    {capitalizeFirstLetter(
                      `${school.name}, ${school.schoolVillage}`
                    )}
                  </option>
                ))
              ) : (
                <option disabled>School data loading.......</option>
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="className" className="block text-gray-700">
              Class
            </label>
            <select
              id="className"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            >
              <option value="" disabled>
                Select your class
              </option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="coordinator" className="block text-gray-700">
              Coordinator
            </label>
            <select
              id="coordinator"
              name="coordinator"
              value={formData.coordinator}
              onChange={handleChange}
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            >
              <option value="" disabled>
                Select your Coordinator
              </option>
              {coordinators.map((coordinator, index) => (
                <option key={index} value={coordinator.id}>
                  {coordinator.firstName} {coordinator.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="villageName" className="block text-gray-700">
              Village Name
            </label>
            <input
              type="text"
              id="villageName"
              name="villageName"
              value={formData.villageName}
              onChange={handleChange}
              placeholder="Village Name"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="talukka" className="block text-gray-700">
              Talukka
            </label>
            <input
              type="text"
              id="talukka"
              name="talukka"
              value={formData.talukka}
              onChange={handleChange}
              placeholder="Talukka"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="District"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
                required
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-2 top-2 text-gray-700"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="px-2 block w-full mt-1 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 text-gray-700"
              disabled
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-md hover:bg-yellow-600 focus:ring focus:ring-yellow-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
