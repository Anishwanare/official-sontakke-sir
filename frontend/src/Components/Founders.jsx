import React from "react";

const foundersData = [
    {
        id: 1,
        name: "Founder Name 1",
        qualifications: "B.A., D.TED., B.ED., M.A., M.ED.",
        description:
            "With 14 years of experience (2011-2024), dedicated to coaching excellence. Currently serving as a teacher at Pune Municipal Corporation schools via Pavitra Portal.",
        image: "/founder1.jpeg",
    },
    {
        id: 2,
        name: "Founder Name 2",
        qualifications: "B.A., D.TED., B.ED., M.A., M.ED.",
        description:
            "Empowering students with a personalized approach to education for 14 years (2011-2024). Passionate about shaping bright futures.",
        image: "/founder2.jpeg",
    },
];

const Founders = () => {
    return (
        <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-gray-200">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                Meet Our Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {foundersData.map((founder) => (
                    <div
                        key={founder.id}
                        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-2"
                    >
                        <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                        />
                        <div className="p-6 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                                {founder.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {founder.qualifications}
                            </p>
                            <p className="mt-4 text-gray-700 leading-relaxed">
                                {founder.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Founders;
