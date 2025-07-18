import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex justify-center items-center">
          <a href="" className="text-yellow-400 hover:text-yellow-300">
            Privacy Policy
          </a>
        </div>
        <div className="flex justify-center items-center">
          <img src="/logo.jpeg" alt="Logo" loading="lazy" className="h-16" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center mb-2">
            <span className="text-yellow-400">&#128274;</span> Dnyanankur
            Welfare Foundation
          </p>
          <p className="text-center text-sm">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
      <div className="bg-gray-800 text-gray-400 py-4 mt-6">
        <div className="container mx-auto text-center">
          <p className="text-sm mb-2">
            Designed and Developed by <span className="text-yellow-400">Anish Wanare</span>
          </p>
          <p className="text-sm">Contact: <a href="tel:+91767722793" className="text-yellow-400 hover:text-yellow-300">97677 22793</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
