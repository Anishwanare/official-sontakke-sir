import React, { useEffect, useState } from "react";
import { galleryData } from "../utils/GalleryData";
import AppLayout from "../AppLayout/AppLayout";
import { motion } from "framer-motion";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="gallery min-h-screen pt-5">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold text-gray-800">Gallery</h1>
        <h2 className="text-lg text-gray-600">Explore Dnyanankur Prakashan</h2>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {galleryData.map((image) => (
          <motion.div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              className="h-auto w-full object-cover rounded-lg"
              src={image.image}
              alt={image.alt || `Image ${image.id}`}
              onClick={() => handleImageClick(image)}
            />
            <button
              onClick={() => window.open(image.image, "_blank")}
              className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
            >
              Download
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
          <motion.div
            className="relative max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              title="close"
              className="absolute top-3 right-3 text-gray-700 text-3xl font-bold hover:text-gray-900"
            >
              &times;
            </button>
            <button
              onClick={() => window.open(selectedImage.image, "_blank")}
              className="absolute top-3 left-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
            >
              Download
            </button>
            <img
              className="max-w-full h-auto rounded-lg"
              src={selectedImage.image}
              alt={selectedImage.alt || "Selected Image"}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AppLayout(Gallery);
  