import React, { useState } from "react";

import { galleryData } from "../utils/GalleryData";
import AppLayout from "../AppLayout/AppLayout";
import { motion } from "framer-motion";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility

  // Open the modal with the clicked image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center  text-gray-800">Gallery</h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-5 md:m-10">
        {galleryData.map((image) => (
          <motion.div
            key={image.id}
            className="image-container cursor-pointer"
            whileHover={{ scale: 1.05 }} // Slightly scale image on hover
            transition={{ duration: 0.3 }}
          >
            <img
              className="h-auto max-w-full rounded-lg object-cover shadow-md hover:shadow-lg"
              src={image.image}
              alt={image.alt || `Image ${image.id}`}
              onClick={() => handleImageClick(image)}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal for Large Image */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg"
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeModal}
              title="close"
              className="absolute -top-1 right-1 text-black text-6xl font-bold"
            >
              &times;
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

export default Gallery;
