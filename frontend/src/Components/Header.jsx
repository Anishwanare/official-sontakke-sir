import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, [show]);


  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Logo" className="h-14 w-14 object-cover shadow-md" />
          <p className="text-gray-900 text-lg md:text-2xl leading-tight">
            ज्ञानांकूर प्रज्ञाशोध परीक्षा <br />
            {new Date().getFullYear()} - {(new Date().getFullYear() + 1).toString().slice(-2)}
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-10 ">
          {[
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
            { name: "School", path: "/school-register" },
            { name: "Student", path: "/student-register" },
            { name: "Coordinator", path: "/coordinator-register" },
            { name: "Admin", path: "/admin-login" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`px-4 py-3 text-lg font-medium text-gray-800  rounded-lg ${item.name === "Admin" ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-yellow-300 hover:bg-yellow-500'}  hover:text-white transition-all duration-300 shadow-md`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-2xl z-50" onClick={handleToggle}>
          {show ? (
            <button className="text-gray-700 focus:outline-none">
              X
            </button>
          ) : (
            <button className="text-gray-700 focus:outline-none font-bold">
              |||
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {show && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleToggle}
            />

            {/* Sidebar Menu */}
            <motion.nav
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col gap-6 py-10 px-6 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {[
                { name: "Home", path: "/" },
                { name: "Gallery", path: "/gallery" },
                { name: "School", path: "/school-register" },
                { name: "Student", path: "/student-register" },
                { name: "Coordinator", path: "/coordinator-register" },
                { name: "Admin", path: "/admin-login" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`px-4 py-3 text-lg font-medium text-gray-800  rounded-lg ${item.name === "Admin" ? 'bg-blue-500 text-white' : 'bg-yellow-300'} hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-md`}
                  onClick={handleToggle}
                >
                  {item.name}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Header;
