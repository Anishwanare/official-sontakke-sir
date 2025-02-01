import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div className="p-6 py-20 bg-white md:px-[200px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold">About</h1>
            <h2 className="text-xl text-zinc-600">Dnyanankur Welfare Foundation</h2>
          </motion.div>

          {/* Content Section with Motion */}
          <div className="flex flex-col md:flex-row items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
              className="md:w-2/3 pr-6"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Developing With a Passion While Exploring The World.
              </h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut" }}
                className="mb-4"
              >
                At Dyanankur Prakashan, we believe that education paves the way for success...
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, ease: "easeOut" }}
                className="mb-4"
              >
                Our vision is to create a world where everyone has access to education...
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, ease: "easeOut" }}
                className="mb-4"
              >
                At our organization, we meticulously craft examination papers...
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, ease: "easeOut" }}
                className="mb-4"
              >
                We are committed to fostering an inclusive learning environment...
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
                className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg mt-4"
              >
                <a href="https://wa.me/+919623161432" target="_blank">Contact Us</a>
              </motion.button>
            </motion.div>

            {/* Image Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              viewport={{ once: true }}
              className="md:w-1/3 mt-6 md:mt-0"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="bg-yellow-500 p-4 rounded-lg"
              >
                <img
                  className="rounded-lg"
                  src="/about.jpg"
                  alt="Students in classroom"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default About;
