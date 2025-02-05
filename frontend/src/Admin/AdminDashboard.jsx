import React, { useEffect, useState, Suspense, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
const SchoolData = React.lazy(() => import("./components/SchoolData"));
const StudentData = React.lazy(() => import("./components/StudentData"));
const MessagesData = React.lazy(() => import("./components/MessagesData"));
const CoordinateData = React.lazy(() => import("./components/CoordinateData"));

const sections = [
  { name: "Schools", icon: "/school.png" },
  { name: "Students", icon: "/student.png" },
  { name: "Coordinator", icon: "/coordinator.png" },
  { name: "Messages", icon: "/message.png" },
];


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Schools");
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutAdmin = () => {
    localStorage.removeItem("AdminToken");
    navigate("/admin-login");
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("AdminToken");
    if (!adminToken) {
      navigate("/admin-login");
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
  }, [navigate]);

  const renderActiveSection = useMemo(() => {
    switch (activeSection) {
      case "Schools":
        return <SchoolData />;
      case "Students":
        return <StudentData />;
      case "Coordinator":
        return <CoordinateData />;
      case "Messages":
        return <MessagesData />;
      default:
        return null;
    }
  }, [activeSection]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-full">
      <aside className={`bg-gray-100 text-black w-full lg:w-80 p-6 flex flex-col justify-between lg:block hidden shadow-md border ${activeSection ? '' : 'border-yellow-600'} `}>
        <Link to="/" className="flex items-center gap-2 underline text-yellow-400 mb-10">
          <img alt="logo" src="/logo.jpeg" className="mr-2 w-12 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">Dnyanankur Prakashan</span>
        </Link>

        {/* Navigation Section */}
        <nav className="flex-1 w-full">
          <ul className="space-y-6">
            {sections.map((section) => (
              <li
                key={section.name}
                onClick={() => setActiveSection(section.name)}
                className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all border ${activeSection === section.name ? "bg-yellow-100 text-black border-yellow-400" : "border-red-400"
                  }`}
              >
                <img alt={`${section.name.toLowerCase()}-icon`} src={section.icon} className="w-8 h-8 rounded-full" />
                <button

                  className={`text-lg font-medium ${activeSection === section.name ? "text-black" : "text-white-800"}`}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>


      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-yellow-500 text-black">
        <Link to="/" className="flex items-center">
          <img alt="logo" src="/logo.jpeg" className="mr-2 w-10" />
          <span className="text-lg font-semibold">{admin?.name || "Admin"}</span>
        </Link>

        {/* Hamburger Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Sidebar with animation */}
      {isMenuOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="absolute top-0 left-0 w-2/3 h-full bg-gray-100 p-6">
            <button onClick={() => setIsMenuOpen(false)} className="text-black absolute top-4 right-4 text-2xl">
              ✕
            </button>
            <nav className="flex flex-col space-y-6 text-black">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => { setActiveSection(section.name); setIsMenuOpen(false); }}
                  className={`flex items-center space-x-2 p-3 border border-red-500 rounded-xl mt-10 ${activeSection === section.name ? "bg-yellow-500 rounded-md" : "hover:bg-yellow-600 hover:rounded-md"}`}
                >
                  <img alt={`${section.name.toLowerCase()}-icon`} src={section.icon} className="w-8 h-8" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto bg-gray-50">
        <header className="flex flex-col sm:flex-row items-center justify-between p-4">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-600 font-medium">Welcome:</span>
            <span className="text-gray-800 font-semibold hover:underline cursor-pointer">{isLoading ? "Loading..." : admin?.name || "Dnyaneshwar Sontakke"}</span>
          </div>

          {/* Logout Button */}
          <button type="button" onClick={handleLogoutAdmin} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all">
            Logout
          </button>
        </header>

        <section className="flex-1 p-4">
          <div className="border-2 border-dashed border-zinc-300 rounded-lg h-full p-4 bg-white">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <HashLoader color="#c4c41d" />
              </div>
            ) : (
              <Suspense fallback={<HashLoader color="#c4c41d" className="m-auto" />}>
                {renderActiveSection}
              </Suspense>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
