import React, { useEffect, useState, Suspense, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";

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
  const { user } = useSelector((state) => state.User); 
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  
  

  const handleLogoutAdmin = () => {
    dispatch(logout());
    return navigate("/admin-login"); 
  };

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
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); 
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen max-h-full bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-stone-100 border-yellow-300 text-black w-full lg:w-80 p-6 flex flex-col justify-between lg:block hidden shadow-lg border-r">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <img alt="logo" src="/logo.jpeg" className="mr-2 w-12 rounded-full shadow-lg" />
          <span className="text-xl font-semibold text-gray-800">Dnyanankur Prakashan</span>
        </Link>

        {/* Navigation Section */}
        <nav className="flex-1 w-full">
          <ul className="space-y-6">
            {sections.map((section) => (
              <li
                key={section.name}
                onClick={() => setActiveSection(section.name)}
                className={`flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-yellow-600 transition-all border 
                ${activeSection === section.name ? "bg-yellow-500 text-black border-yellow-400" : "border-gray-300"}`}
              >
                <img alt={`${section.name.toLowerCase()}-icon`} src={section.icon} className="w-8 h-8 rounded-full" />
                <span className={`text-lg font-medium ${activeSection === section.name ? "text-black" : "text-gray-800"}`}>
                  {section.name}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-yellow-500 text-black">
        <Link to="/" className="flex items-center">
          <img alt="logo" src="/logo.jpeg" className="mr-2 w-10" />
          <span className="text-lg font-semibold">{user?.name || "Dnyaneshwar sontakke"}</span>
        </Link>

        {/* Hamburger Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none text-2xl">
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="absolute top-0 left-0 w-2/3 h-full bg-white p-6">
            <button onClick={() => setIsMenuOpen(false)} className="text-black absolute top-4 right-4 text-2xl">
              ✕
            </button>
            <nav className="flex flex-col space-y-6 text-black">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => {
                    setActiveSection(section.name);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-3 border border-gray-300 rounded-xl mt-10 
                  ${activeSection === section.name ? "bg-yellow-500 rounded-md" : "hover:bg-yellow-600 hover:rounded-md"}`}
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
      <main className="flex-1 flex flex-col overflow-auto bg-white p-6">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-gray-600 font-medium">Welcome:</span>
            <span className="text-gray-800 font-semibold hover:underline cursor-pointer">
              {isLoading ? "Loading..." : user?.name || "Dnyaneshwar Sontakke"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogoutAdmin}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white font-medium shadow-lg transition-all"
          >
            Logout
          </button>
        </header>

        <section className="flex-1 p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <HashLoader color="#fbbf24" size={60} />
            </div>
          ) : (
            <Suspense fallback={<HashLoader color="#fbbf24" className="m-auto" />}>{renderActiveSection}</Suspense>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
