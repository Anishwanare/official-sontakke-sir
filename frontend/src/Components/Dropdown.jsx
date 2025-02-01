import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ title, desc }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 max-w-4xl md:mx-auto mx-6 overflow-hidden">
      {/* Dropdown Header */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setDropDown(!dropDown)}
      >
        <span className="text-zinc-800 font-medium text-lg">{title}</span>

        {/* Animated Arrow Icon */}
        <motion.svg
          className="w-6 h-6 text-zinc-600"
          animate={{ rotate: dropDown ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </motion.svg>
      </div>

      {/* Animated Dropdown Content */}
      <AnimatePresence>
        {dropDown && (
          <motion.div
            initial={{ opacity: 0, height: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, height: "auto", clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, height: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-4 pb-4 text-zinc-600"
          >
            {desc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
