import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteSchool, fetchSchools } from "../../../store/slices/schoolSlice";

const SchoolData = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState(""); // Added state for document name
  const dispatch = useDispatch();
  const { schools, loading } = useSelector((state) => state.School);
  const [uploadingFile, setUploadingFile] = useState(false)

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  })

  const handleDeleteSchool = async (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      try {
        await dispatch(deleteSchool(id)).unwrap();
        toast.success("School deleted successfully!");
      } catch (err) {
        toast.error(err.message || "Failed to delete school.");
      }
    }
  };

  const handleOpenModal = (school) => {
    setSelectedSchool(school);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSchool(null);
    setSelectedFile(null);
    setDocumentName(""); // Reset document name
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!documentName.trim()) {
      toast.error("Please enter a document name.");
      return;
    }
    if (!selectedFile) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("documentName", documentName); // Add document name
    formData.append("document", selectedFile);
    console.log(selectedSchool._id)

    try {
      setUploadingFile(true)
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v5/admin/upload-file-to-school/${selectedSchool?._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.success) {
        toast.success("File uploaded successfully!");
        setUploadingFile(false)
        setDocumentName("")
        setSelectedFile(null)
        handleCloseModal();

      }
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Failed to upload file.");
      setUploadingFile(false)
    }
  };

  return (
    <div className="py-4 ">
      {schools.length > 0 ? (
        <div className="overflow-x-auto ">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "S.N.",
                  "Name",
                  "District",
                  "Village",
                  "Talukka",
                  "School ID",
                  "Co-ordinator",
                  "Password",
                  "Head Master Name",
                  "Head Master Mobile",
                  "Actions",
                ].map((header, index) => (
                  <th key={index} className="py-2 px-2 border text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schools.map((school, index) => (
                <tr
                  key={school._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOpenModal(school)}
                >
                  <td className="py-2 px-2 border">{index + 1}</td>
                  <td className="py-2 px-2 border">{school.name}</td>
                  <td className="py-2 px-2 border">{school.district}</td>
                  <td className="py-2 px-2 border">{school.schoolVillage}</td>
                  <td className="py-2 px-2 border">{school.talukka}</td>
                  <td className="py-2 px-2 border">{school.schoolId}</td>
                  <td className="py-2 px-2 border">{school.coordinator}</td>
                  <td className="py-2 px-2 border">{school.password}</td>
                  <td className="py-2 px-2 border">{school.headMasterName}</td>
                  <td className="py-2 px-2 border">{school.headMasterMobile}</td>
                  <td className="py-2 px-2 border flex flex-col items-center gap-2">
                    <Link to={`/admin/update-school/${school._id}`} className="text-blue-500 hover:underline">
                      Update
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSchool(school._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4">{loading ? "Loading..." : "No data available!"}</div>
      )}

      {/* Modal for File Upload */}
      {showModal && selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
            <h2 className="text-xl font-bold mb-4 text-center">{selectedSchool?.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "District", value: selectedSchool?.district },
                { label: "Village", value: selectedSchool?.schoolVillage },
                { label: "Talukka", value: selectedSchool?.talukka },
                { label: "School ID", value: selectedSchool?.schoolId },
                { label: "Head Master Name", value: selectedSchool?.headMasterName },
                { label: "Head Master Mobile", value: selectedSchool?.headMasterMobile },
              ].map((item, index) => (
                <p key={index}>
                  <strong>{item.label}:</strong> {item.value || "N/A"}
                </p>
              ))}
            </div>

            {/* Document Name Input */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Document Name:</label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>

            {/* File Upload Input */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Upload File:</label>
              <input type="file" accept=".pdf,.docx,.xlsx,.xls,.jpeg,.png" onChange={handleFileChange} />
            </div>

            <div className="mt-4 flex justify-between">
              <button onClick={handleFileUpload} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                {uploadingFile ? "Uploading.." : "Upload"}
              </button>
              <button onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolData;
