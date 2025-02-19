import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const School = () => {
    const { user } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="pt-28 px-4 md:px-8 min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
                    {user?.name || "School Name"}
                </h1>
                <button
                    onClick={handleLogout}
                    className="mt-4 md:mt-0 px-6 py-2 text-white font-semibold rounded-lg bg-red-500 hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Information Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">School Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-lg text-gray-700"><strong>Coordinator:</strong> {user?.coordinator}</p>
                            <p className="text-lg text-gray-700"><strong>Head Master:</strong> {user?.headMasterName || "N/A"}</p>
                            <p className="text-lg text-gray-700"><strong>Mobile:</strong> {user?.headMasterMobile || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-lg text-gray-700"><strong>District:</strong> {user?.district}</p>
                            <p className="text-lg text-gray-700"><strong>Talukka:</strong> {user?.talukka}</p>
                            <p className="text-lg text-gray-700"><strong>Village:</strong> {user?.schoolVillage}</p>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-y-auto max-h-[500px]">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
                    {user?.documents?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.documents.map((d) => {
                                const uploadDate = new Date(user?.updatedAt);
                                const currentDate = new Date();
                                const isNew = (currentDate - uploadDate) / (1000 * 60 * 60 * 24) <= 10;

                                return (
                                    <div key={d._id} className="p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative flex flex-col">
                                        <p className="text-lg font-semibold text-gray-800">{d.documentName}</p>
                                        <p className="text-sm text-gray-600">Date: {user?.updatedAt?.slice(0, 10).split("-").reverse().join("-")}</p>
                                        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${isNew ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                                            {isNew ? "New" : "Old"}
                                        </span>
                                        <a
                                            href={d.url}
                                            download
                                            target="_blank"
                                            className="mt-auto text-blue-600 hover:text-blue-500 underline text-center"
                                        >
                                            📥 Download Document
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">No documents uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default School;
