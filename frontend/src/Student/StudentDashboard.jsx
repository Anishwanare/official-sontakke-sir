import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";

const StudentDashboard = () => {
    const { user } = useSelector((state) => state.User);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen p-6 flex flex-col gap-8 bg-white">
            {/* Header */}
            <div className="flex md:flex-row items-center justify-around pb-4">
                <h1 className="text-xl md:text-3xl font-bold">Welcome {user.firstName} {user.lastName}</h1>
                <button onClick={handleLogout} className="border px-4 py-2 rounded-md hover:bg-red-400" title="Logout">Logout</button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow max-h-[500px]">
                {/* Student Information */}
                <div className="md:border p-2 rounded-md border-black flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Student Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <p><strong>Full Name:</strong> {user?.firstName} {user?.middleName} {user?.lastName}</p>
                        <p><strong>Class:</strong> {user?.className}</p>
                        <p><strong>School:</strong> {user?.school}</p>
                        <p><strong>District:</strong> {user?.district}</p>
                        <p><strong>Talukka:</strong> {user?.talukka}</p>
                        <p><strong>Village:</strong> {user?.villageName}</p>
                        <p><strong>Coordinator:</strong> {user?.coordinator}</p>
                        <p><strong>Phone:</strong> {user?.phone}</p>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className=" border p-2 rounded-md border-black  col-span-2 flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                    <h2 className="text-xl font-semibold">Uploaded Documents</h2>
                    {user?.documents?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {user.documents.map((d) => (
                                <div key={d?._id} className="border p-4 rounded-lg flex flex-col gap-2">
                                    <p className="font-semibold">{d?.documentName}</p>
                                    <p className="text-sm">Date: {new Date(user?.updatedAt).toLocaleDateString()}</p>
                                    <a href={d?.url} download target="_blank" rel="noopener noreferrer" className="mt-auto underline text-center">
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No documents uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppLayout(StudentDashboard);