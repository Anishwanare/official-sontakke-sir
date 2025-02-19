import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoordinators } from "../../../../store/slices/coordinatorSlice";
import { updateStudent } from "../../../../store/slices/studentSlice";

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch coordinators from Redux store
    const { coordinators, loading, error } = useSelector((state) => state.Coordinator);

    // Local state for student details
    const [student, setStudent] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        school: "",
        coordinator: "",
        className: "",
        talukka: "",
        district: "",
    });

    const [fetching, setFetching] = useState(true);

    // Fetch student details based on ID
    const fetchStudent = useCallback(async () => {
        if (!id) return;

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/getme/student/${id}`, { withCredentials: true, headers: { 'Content-Type': "application/json" } });
            if (response.data.success) {
                setStudent(response.data.getStudent);
            }
        } catch (error) {
            console.error("Error fetching student data:", error.response?.data || error.message);
            toast.error("Error fetching student data!");
        } finally {
            setFetching(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStudent();
    }, [fetchStudent]);

    useEffect(() => {
        dispatch(fetchCoordinators());
    }, [dispatch]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    // Handle student update
    const handleUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateStudent(id, student));
        navigate("/admin-dashboard");
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <HashLoader color="#1276e2" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">Update Student</h2>
                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Fields */}
                    {["firstName", "middleName", "lastName"].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label htmlFor={field} className="text-sm md:text-base font-medium text-gray-700 capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={student[field]}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required={field !== "middleName"}
                            />
                        </div>
                    ))}

                    {/* Other Fields */}
                    {["phone", "className", "talukka", "district"].map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label htmlFor={field} className="text-sm md:text-base font-medium text-gray-700 capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={student[field]}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>
                    ))}

                    {/* School (Disabled) */}
                    <div className="flex flex-col">
                        <label htmlFor="school" className="text-sm md:text-base font-medium text-gray-700">
                            School
                        </label>
                        <input
                            type="text"
                            id="school"
                            name="school"
                            value={student.school}
                            className="p-2 border border-gray-300 rounded-md text-gray-500 bg-gray-200"
                            disabled
                        />
                    </div>

                    {/* Coordinator Selection */}
                    <div className="flex flex-col">
                        <label htmlFor="coordinator" className="text-sm md:text-base font-medium text-gray-700">
                            Coordinator
                        </label>
                        <select
                            id="coordinator"
                            name="coordinator"
                            value={student.coordinator}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                            disabled
                        >
                            <option value="" >Select your Coordinator</option>
                            {Array.isArray(coordinators) &&
                                coordinators.map((coordinator) => (
                                    <option key={coordinator.id} value={coordinator.id}>
                                        {coordinator.firstName} {coordinator.lastName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Submit Button - Spans Full Width on Small Screens */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50"
                            disabled={loading || fetching}
                        >
                            {loading ? "Updating Stundent.." : "Update Student"}
                        </button>
                    </div>
                    <div className="md:col-span-2">
                        <Link to={"/admin-dashboard"}>
                            <button
                                className="w-full text-yellow-500 hover:underline font-medium py-2 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50"

                            >
                                Back
                            </button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudent;
