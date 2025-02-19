import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

const Header = () => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.User);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // Hide header on scroll for desktop screens only
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 1024) {
        const currentScrollPos = window.scrollY;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleToggle = () => setShow((prev) => !prev);
  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  // Hide header on restricted pages
  const restrictedPaths = ["/admin-dashboard", "/update-school/*", "/school-login"];
  if (restrictedPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <motion.header
      className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-transform"
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="logo.jpeg" alt="Logo" className="h-12 w-12 object-cover shadow-md" />
          <p className="text-gray-900 text-lg md:text-xl font-semibold">
            ज्ञानांकूर प्रज्ञाशोध परीक्षा <br />
            {new Date().getFullYear()} - {(new Date().getFullYear() + 1).toString().slice(-2)}
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          <Link to="/" className="text-lg font-medium text-gray-800 hover:text-yellow-500 transition">
            Home
          </Link>
          <Link to="/gallery" className="text-lg font-medium text-gray-800 hover:text-yellow-500 transition">
            Gallery
          </Link>

          {isAuthenticated && user?.role === "Admin" && (
            <div className="relative group">
              <button
                onClick={handleDropdownToggle}
                className="text-lg font-medium text-gray-800 flex items-center gap-1 hover:text-yellow-500 transition"
              >
                Registration <IoIosArrowDown className="transition-transform" />
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                  <Link to="/school-register" className="block px-4 py-3 hover:bg-yellow-500 hover:text-white">
                    School Registration
                  </Link>
                  <Link to="/student-register" className="block px-4 py-3 hover:bg-yellow-500 hover:text-white">
                    Student Registration
                  </Link>
                  <Link to="/coordinator-register" className="block px-4 py-3 hover:bg-yellow-500 hover:text-white">
                    Coordinator Registration
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Show Loading Indicator */}
          {loading && <HashLoader className="text-yellow-500" />}

          {!isAuthenticated ? (
            <>
              <Link to="/school-login" className="text-lg font-medium text-gray-800 hover:text-yellow-500 transition">
                School Login
              </Link>
              <Link
                to="/admin-login"
                className="text-lg font-medium bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>
              {user?.role === "School" && (
                <Link to="/school-home" className="text-lg font-medium text-gray-800">
                  {user?.name}
                </Link>
              )}
              {user?.role === "Admin" && (
                <Link to="/admin-dashboard" className="text-lg font-medium text-gray-800">
                  Admin Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden text-2xl z-50 cursor-pointer" onClick={handleToggle}>
          {show ? "" : <FaBars className="text-gray-700" />}
        </div>

      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
  {show && (
    <div className="bg-black/50 backdrop-blur-sm fixed inset-0 z-40">
      <motion.nav
        className="fixed top-0 left-0 md:w-8/12 sm:w-6/12 h-screen bg-white shadow-lg flex flex-col py-10 px-6 z-50"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="logo.jpeg" alt="Logo" className="h-12 w-12 object-cover shadow-md" />
            <p className="text-gray-900 text-lg md:text-xl font-semibold">
              ज्ञानांकूर प्रज्ञाशोध परीक्षा <br />
              {new Date().getFullYear()} - {(new Date().getFullYear() + 1).toString().slice(-2)}
            </p>
          </Link>
          <FaTimes className="text-2xl text-gray-700 cursor-pointer" onClick={handleToggle} />
        </div>

        <hr className="mt-5 h-1 shadow-lg bg-yellow-500" />

        <div className="flex flex-col gap-4 mt-6">
          <Link
            to="/"
            className="border border-yellow-200 py-3 text-lg text-gray-800 font-medium text-center rounded-lg hover:bg-yellow-500 hover:text-white transition"
            onClick={handleToggle}
          >
            Home
          </Link>

          <Link
            to="/gallery"
            className="border border-yellow-200 py-3 text-lg text-gray-800 font-medium text-center rounded-lg hover:bg-yellow-500 hover:text-white transition"
            onClick={handleToggle}
          >
            Gallery
          </Link>

          {isAuthenticated && user?.role === "Admin" && (
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="border border-yellow-200 w-full py-3 text-lg font-medium text-gray-800 flex items-center justify-center gap-2 hover:bg-yellow-500 hover:text-white rounded-lg transition"
              >
                Registration <IoIosArrowDown />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col bg-gray-100 rounded-lg mt-2 shadow-md"
                  >
                    <Link
                      to="/school-register"
                      className="border border-yellow-200 py-3 px-4 text-gray-800 hover:bg-yellow-500 hover:text-white text-center rounded-lg"
                      onClick={handleToggle}
                    >
                      School Registration
                    </Link>
                    <Link
                      to="/student-register"
                      className="border border-yellow-200 py-3 px-4 text-gray-800 hover:bg-yellow-500 hover:text-white text-center rounded-lg"
                      onClick={handleToggle}
                    >
                      Student Registration
                    </Link>
                    <Link
                      to="/coordinator-register"
                      className="border border-yellow-200 py-3 px-4 text-gray-800 hover:bg-yellow-500 hover:text-white text-center rounded-lg"
                      onClick={handleToggle}
                    >
                      Coordinator Registration
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Show Loading Indicator */}
          {loading && <HashLoader className="text-yellow-500 self-center" />}

          {!isAuthenticated ? (
            <>
              <Link
                to="/school-login"
                className="border border-yellow-200 py-3 text-lg font-medium text-gray-800 text-center hover:bg-yellow-500 hover:text-white rounded-lg transition"
                onClick={handleToggle}
              >
                School Login
              </Link>
              <Link
                to="/admin-login"
                className="py-3 text-lg font-medium bg-blue-500 text-white text-center rounded-lg px-6 hover:bg-blue-600 transition"
                onClick={handleToggle}
              >
                Admin Login
              </Link>
            </>
          ) : (
            <>
              {user?.role === "School" && (
                <Link
                  to="/school-home"
                  className="py-3 text-lg font-medium text-gray-800 text-center rounded-lg hover:bg-yellow-500 hover:text-white transition"
                  onClick={handleToggle}
                >
                  {user?.name}
                </Link>
              )}
              {user?.role === "Admin" && (
                <Link
                  to="/admin-dashboard"
                  className="py-3 text-lg font-medium text-gray-800 text-center rounded-lg hover:bg-yellow-500 hover:text-white transition"
                  onClick={handleToggle}
                >
                  Admin Dashboard
                </Link>
              )}
            </>
          )}
        </div>
      </motion.nav>
    </div>
  )}
</AnimatePresence>


    </motion.header>
  );
};

export default Header;
