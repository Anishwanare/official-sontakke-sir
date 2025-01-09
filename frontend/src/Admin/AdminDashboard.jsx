import React, { useEffect, useState } from "react";
import SchoolData from "./components/SchoolData";
import StudentData from "./components/StudentData";
import MessagesData from "./components/MessagesData";
import CoordinateData from "./components/CoordinateData";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const sections = [
  { name: "Schools", icon: "/school.png" },
  { name: "Students", icon: "/student.png" },
  { name: "Messages", icon: "/message.png" },
  { name: "Coordinator", icon: "/coordinator.png" },
];

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Schools");
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutAdmin = () => {
    localStorage.removeItem("AdminToken");
    location.reload();
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("AdminToken");
    if (!adminToken) {
      Navigate("/admin-login");
      return;
    }

    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/fetch`,
          { withCredentials: true }
        );
        if (response?.data?.status) {
          setAdmin(response?.data.admin[0]);
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminInfo();
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Schools":
        return <SchoolData />;
      case "Students":
        return <StudentData />;
      case "Messages":
        return <MessagesData />;
      case "Coordinator":
        return <CoordinateData />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-full">
      {/* Sidebar for larger screens */}
      <div className="bg-blue-600 text-white w-full lg:w-64 p-4 flex flex-col justify-between lg:block hidden">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center mb-8">
            <img alt="logo" src="/logo.jpeg" className="mr-2 w-10" />
            <span className="text-lg font-semibold">Dnyaneshwar Sontakke</span>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="flex-1 w-full mb-8">
          <ul className="space-y-4">
            {sections.map((section) => (
              <li
                key={section.name}
                className={`flex items-center space-x-2 cursor-pointer ${
                  activeSection === section.name ? "underline" : ""
                }`}
              >
                <img
                  alt={`${section.name.toLowerCase()}-icon`}
                  src={section.icon}
                  className="w-6 sm:w-8 rounded-full"
                />
                <button
                  onClick={() => setActiveSection(section.name)}
                  className="text-white font-semibold"
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-blue-600 text-white">
        <Link to="/">
          <div className="flex items-center">
            <img alt="logo" src="/logo.jpeg" className="mr-2 w-10" />
            <span className="text-lg font-semibold">Dnyaneshwar Sontakke</span>
          </div>
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden block text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu with Dimmed Background and Smooth Animation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10 transition-all duration-300 ease-in-out">
          <div className="absolute top-0 left-0 w-2/3 h-full bg-blue-600 p-6 transform transition-transform duration-300 ease-in-out">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white absolute top-4 right-4 text-2xl"
            >
              &times;
            </button>
            <div className="flex flex-col space-y-6 text-white">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => {
                    setActiveSection(section.name);
                    setIsMenuOpen(false); // Close the menu after selection
                  }}
                  className={`flex items-center space-x-2 p-3 ${
                    activeSection === section.name
                      ? "bg-blue-700 rounded-md"
                      : "hover:bg-blue-700 hover:rounded-md"
                  }`}
                >
                  <img
                    alt={`${section.name.toLowerCase()}-icon`}
                    src={section.icon}
                    className="w-8 h-8"
                  />
                  <span>{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-zinc-200 bg-white">
          {/* Search */}
          <div className="flex items-center space-x-2 w-full sm:w-auto mb-4 sm:mb-0">
            <img alt="search-icon" src="https://placehold.co/24x24" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-zinc-100 p-2 w-full sm:w-auto rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Welcome:</span>
              <span>{isLoading ? "Loading..." : admin?.name || "Admin"}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogoutAdmin}
            className="text-red-600 mt-2 sm:mt-0"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4">
          <div className="border-2 border-dashed border-zinc-300 rounded-lg h-full p-4 bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="loader"></div>
              </div>
            ) : (
              renderActiveSection()
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
