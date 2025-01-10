import React from "react";

const foundersData = [
    {
        id: 1,
        name: "Sir Dnyaneshwar Sontakke",
        qualifications: "B.A., D.TED., B.ED., M.A., M.ED.",
        description:
            "With 14 years of experience (2011-2024), dedicated to coaching excellence. Currently serving as a teacher at Pune Municipal Corporation schools via Pavitra Portal.",
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
];

const Founders = () => {
    return (
        <div className="container mx-auto px-8 py-16">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                Meet Our Founders
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
                {foundersData.map((founder) => (
                    <div
                        key={founder.id}
                        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden hover:scale-100 hover:shadow-2xl "
                    >
                        <div className="relative flex-1">
                            <img
                                src={founder.image}
                                alt={founder.name}
                                className="w-full h-64 object-cover rounded-t-lg md:rounded-l-lg "
                            />
                        </div>
                        <div className="p-6 flex flex-col justify-center flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 transition-all duration-300 hover:text-blue-600">
                                {founder.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {founder.qualifications}
                            </p>
                            <p className="mt-4 text-gray-700 leading-relaxed transition-all duration-300">
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
