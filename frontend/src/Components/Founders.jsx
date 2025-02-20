import React from "react";
import { motion } from "framer-motion";

const foundersData = [
    {
        id: 1,
        name: "Sir Dnyaneshwar Sontakke",
        qualifications: "B.A.Ed.",
        description:
            "With 25 years of experience, I’ve helped over 3,000 students secure scholarships worth 75 lakh, connected with 5,000+ schools, and authored 10 educational books. I also conduct online test series for scholarship exams and offer quality online classes for grades 1-8.",
        image: "/founder1.jpeg",
    },
    {
        id: 2,
        name: "Sir Surendra Panzade",
        qualifications: "B.A., D.TED., B.ED., M.A., M.ED.",
        description:
            "Empowering students with a personalized approach to education for 14 years (2011-2024). Passionate about shaping bright futures.",
        image: "/founder2.jpeg",
    },
    {
        id: 3,
        name: "Mam Reshma A. Sangodkar",
        qualifications: "B.Com, PG Diploma in Technical Writing",
        description:
            "Academic writer for Dyanankur Prakashan, Amravati. Specialized in English content for grades one to seven. Published author and article contributor in multiple newspapers.",
        image: "/founder3.jpg",
    },
    {
        id: 4,
        name: "Sir Ravi Anantrao Bhisekar",
        qualifications: "M. Com, B.Ed.",
        description:
            "Five years of experience, CTET passed. Since 2019, has been providing scholarship exam classes to rural students, helping many secure scholarships and top district rankings.",
        image: "/founder4.jpeg",
    },
];

const Founders = () => {
    return (
        <div className="container mx-auto px-6 py-16 ">
            {/* Title with motion effect */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-center text-gray-00 mt-8"
            >
                Meet Our Founders
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg text-gray-700 text-center max-w-2xl mx-auto my-4"
            >
                Our founders are passionate visionaries with a strong grasp of <span className="text-yellow-600 font-bold">technology</span> and <span className="text-yellow-600 font-bold">business</span>. Their dedication to <span className="text-yellow-600 font-bold">innovation</span>, <span className="text-yellow-600 font-bold">quality</span>, and <span className="text-yellow-600 font-bold">customer satisfaction</span> drives us to create exceptional solutions.
            </motion.p>


            {/* Cards Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {foundersData.map((founder, index) => (
                    <motion.div
                        key={founder.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }}
                        className="relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
                    >
                        <div className="relative flex flex-col items-center text-center p-6">
                            <motion.img
                                src={founder.image}
                                alt={founder.name}
                                loading="lazy"
                                className="w-40 h-40 object-cover rounded-xl border-4 border-yellow-500 mb-4"
                                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                            />
                            <motion.h3
                                className="text-xl font-bold text-gray-800 mb-1"
                                whileHover={{ color: "#fbbf24" }}
                            >
                                {founder.name}
                            </motion.h3>
                            <p className="text-sm text-gray-500 font-semibold mb-3">
                                {founder.qualifications}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {founder.description}
                            </p>
                        </div>
                        <motion.div
                            className={`absolute top-0 right-0 px-4 py-2 bg-yellow-500 ${founder.id === 3 || founder.id === 4 ? 'hidden' : 'block'} text-white text-xs font-bold rounded-bl-2xl`}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            Founder
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Founders;
