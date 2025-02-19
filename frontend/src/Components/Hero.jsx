import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <main className="container mx-auto px-4 text-center flex md:flex-row flex-col-reverse mt-20 pt-5 justify-around">

        {/* Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-8 flex-col  rounded-xl mt-24"
        >
          <img
            src="/logo.jpeg"
            alt="Illustration"
            className="h-96 object-contain bg-transparent rounded-xl"
          />
        </motion.div>

        {/* Animated Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col backdrop align-middle justify-center gap-5"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-700 dark:text-zinc-600 text-lg font-medium"
          >
            Empowering Young Minds, Shaping Future Leaders!
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="text-orange-600 dark:text-orange-400 text-4xl font-bold mb-4"
          >
            Excellence in Education, <br /> Nurturing Bright Futures!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ease: "easeOut" }}
            className="text-zinc-700 dark:text-zinc-600 text-lg font-semibold mb-2"
          >
            Scholarship-Based Examination for Students of Std 1st to 7th
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, ease: "easeOut" }}
            className="text-zinc-500 dark:text-zinc-600 text-md"
          >
            Open for students across <span className="text-blue-500 font-semibold">Marathi, English, and Semi-English Mediums.</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: "easeOut" }}
            className="text-gray-600 dark:text-gray-400 text-md italic"
          >
            "Encouraging Knowledge, Building Confidence!"
          </motion.p>
        </motion.div>
      </main>
    </>
  );
};

export default Hero;
