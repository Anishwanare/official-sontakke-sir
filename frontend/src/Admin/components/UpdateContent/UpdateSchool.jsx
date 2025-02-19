import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { updateSchool } from "../../../../store/slices/schoolSlice";
import { useDispatch } from "react-redux";

const UpdateSchool = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        schoolId: "",
        password: "",
        schoolVillage: "",
        talukka: "",
        district: "",
        coordinator: "",
        headMasterName: "",
        headMasterMobile: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSchoolDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_BASE_URL}/api/v2/school/get-school/${id}`, { withCredentials: true, headers: { 'Content-Type': "application/json" } }
            );
            const { _id, createdAt, updatedAt, __v, documents, ...schoolData } = response.data?.school;
            setFormData(schoolData);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError("Failed to fetch school details");
        }
    }, [id]);

    useEffect(() => {
        fetchSchoolDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateSchool(id, formData));
        navigate("/admin-dashboard");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <HashLoader color="#1276e2" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">Update School</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData).map((field, idx) => (
                        <div key={idx} className="flex flex-col">
                            <label htmlFor={field} className="text-sm md:text-base font-medium text-gray-700 capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>
                    ))}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-300 ease-in-out disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update School"}
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

export default UpdateSchool;