import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="p-6 py-10 md:px-[200px]" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* SEO-Optimized Title & Subtitle */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold">About Dnyanankur Welfare Foundation</h1>
          <h2 className="text-2xl text-zinc-600">Empowering Education for a Brighter Future</h2>
        </motion.header>

        {/* Content Section with Motion */}
        <div className="flex flex-col md:flex-row items-start">
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="md:w-2/3 pr-6"
          >
            <h3 className="text-2xl font-semibold mb-4">
              Our Mission: Transforming Education
            </h3>
            <p className="mb-4">
              At Dnyanankur, we believe education is the key to unlocking a child's potential.
              Our goal is to provide high-quality study resources, online tools, and expert guidance
              to help students succeed in their academic journey.
            </p>
            <p className="mb-4">
              We specialize in meticulously crafted examination papers, scholarship preparation,
              and innovative learning methods that make studying efficient and effective.
            </p>
            <motion.a
              href="https://wa.me/+919623161432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg mt-4"
            >
              Contact Us
            </motion.a>
          </motion.article>

          {/* Image Animation */}
          <motion.figure
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/3 mt-6 md:mt-0"
          >
            <img
              className="rounded-lg shadow-lg"
              src="/about.jpg"
              alt="Students in classroom at Dnyanankur Welfare Foundation"
            />
          </motion.figure>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
