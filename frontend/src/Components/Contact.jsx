import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/message/send`,
        { name, email, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Page Title */}
      <motion.h1 
        className="text-3xl font-bold text-center text-zinc-800 mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>

      <div className="flex flex-col md:flex-row justify-center items-start p-6 md:px-[200px] px-4 my-8 w-full m-auto">
        
        {/* Form Section */}
        <motion.div
          className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Your Name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <textarea
                id="message"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="w-full md:w-1/2 p-6 bg-gray-100 shadow-lg rounded-lg mt-6 md:mt-0 md:ml-6"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          
          <div className="p-4 rounded-md space-y-4">
            <p className="text-lg text-gray-700">
              <span className="font-bold">Address:</span> At Post Pathrot, Tq Achalpur, Dist Amravati, 444808
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">WhatsApp:</span> <a href="https://wa.me/919623161432" className="text-blue-600 hover:underline">+91 96231 61432</a>
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Facebook:</span> 
              <a href="https://www.facebook.com/profile.php?id=61555652351984&mibextid=ZbWKwL" className="text-blue-600 hover:underline"> Visit our Facebook Page</a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
