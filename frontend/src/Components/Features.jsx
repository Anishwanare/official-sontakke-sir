import React from "react";
import { motion } from "framer-motion";
import Dropdown from "./Dropdown";

const featuresData = [
  {
    title: "Develop Critical Thinking Skills",
    desc: "At Dyanankur Prakashan, we believe that critical thinking skills are developed through analysis, problem-solving, creative thinking, breaking down complex information for better understanding, exploring various options, and teaching students to deeply comprehend the meaning of given information. Our examination papers incorporate all these elements to cultivate the critical thinking abilities of students."
  },
  {
    title: "Real-World Scenario-Based Learning",
    desc: "At Dyanankur Prakashan, we create examination papers based on real-world scenarios to help students engage more confidently. Our approach encourages students to reflect on their own thinking processes. Our exams are designed to develop students' planning skills for future scenarios."
  },
  {
    title: "Creative & Innovative Problem-Solving",
    desc: "At Dyanankur Prakashan, we foster a mindset that values creative and innovative problem-solving. We prioritize accuracy in all aspects of our teaching. We assist students in identifying patterns within what may initially appear chaotic. Our commitment lies in developing the critical thinking skills of every student, enabling them to tackle complex challenges and thrive in their academic, personal, and professional endeavors."
  }
];

const Features = () => {
  return (
    <>
      {/* Features Section with Motion */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white pt-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-800">Features</h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-zinc-600 mt-2"
          >
            Main features of <span className="font-bold text-yellow-600">Dnyanankur</span>
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-4 border-t-4 border-yellow-500 w-16 mx-auto"
          ></motion.div>
        </div>
      </motion.div>

      {/* Animated Feature Dropdowns */}
      {featuresData.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Dropdown title={feature.title} desc={feature.desc} />
        </motion.div>
      ))}
    </>
  );
};

export default Features;
