import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // Import motion from framer-motion

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(name, email, message);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/message/send`,
        {
          name,
          email,
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.status) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      // Clear form fields after submission
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start p-6 bg-gray-100 md:px-[200px] px-0">
        {/* Sliding and fading form */}
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Staggered form inputs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacts@company.com"
                className="w-full p-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here"
                className="w-full p-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {loading ? "SENDING....." : "SEND MESSAGE"}
            </motion.button>
          </form>
        </motion.div>

        {/* Sliding and fading contact info */}
        <motion.div
          className="w-full md:w-1/2 p-4"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="bg-zinc-100 p-4 rounded-md">
            <p className="mt-4">
              At post Pathrot Tq Achalpur Dist Amravati 444808
            </p>
            <p>Whatsapp us +91 96231 61432</p>
            <p>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/profile.php?id=61555652351984&mibextid=ZbWKwL"
                className="text-blue-500 hover:underline text-wrap"
              >
                Visit to Facebook
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
