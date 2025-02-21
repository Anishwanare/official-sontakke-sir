import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent, deleteStudent } from "../../../store/slices/studentSlice";
const TOTAL_ITEM = 150;

const StudentData = () => {
  const dispatch = useDispatch();
  const { loading, students, error } = useSelector((state) => state.Student);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);


  if (error) {
    console.log("my error", error)
    return (<div className="text-center text-red-500 py-4">{error}</div>
    )
  }

  useEffect(() => {
    dispatch(fetchStudent());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const filteredData = useMemo(() => {
    return students.filter((student) =>
      (!selectedSchool || student.school === selectedSchool) &&
      (!selectedClass || student.className === selectedClass) &&
      (!selectedCoordinator || student.coordinator === selectedCoordinator) &&
      (!searchTerm ||
        `${student.firstName} ${student.middleName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  }, [students, selectedSchool, selectedClass, selectedCoordinator, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / TOTAL_ITEM);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * TOTAL_ITEM;
    return filteredData.slice(start, start + TOTAL_ITEM);
  }, [filteredData, currentPage]);

  const handleExportToExcel = () => {
    if (filteredData.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    const exportData = filteredData.map((student, index) => ({
      "Sr No.": index + 1,
      "Full Name": `${student.firstName} ${student.middleName} ${student.lastName}`,
      Phone: student.phone,
      School: student.school,
      Coordinator: student.coordinator,
      Class: student.className,
      Talukka: student.talukka,
      District: student.district,
      "Enrollment Date": new Date(student.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, `Students_${new Date().toISOString()}.xlsx`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className="py-4">
      <p className="text-center my-2">
        {loading ? "Loading..." : `Total Students: ${filteredData.length}`}
      </p>

      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Search by Name", value: searchTerm, onChange: setSearchTerm, type: "text", placeholder: "Enter student name" },
            { label: "Select School", value: selectedSchool, onChange: setSelectedSchool, options: [...new Set(students.map((s) => s.school))] },
            { label: "Select Class", value: selectedClass, onChange: setSelectedClass, options: [...new Set(students.map((s) => s.className))] },
            { label: "Select Coordinator", value: selectedCoordinator, onChange: setSelectedCoordinator, options: [...new Set(students.map((s) => s.coordinator))] },
          ].map((field, index) => (
            <div key={index} className="w-full">
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              {field.options ? (
                <select value={field.value} onChange={(e) => field.onChange(e.target.value)} className="w-full p-2 border rounded-md shadow-sm">
                  <option value="">All</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input type={field.type} value={field.value} onChange={(e) => field.onChange(e.target.value)} className="w-full p-2 border rounded-md shadow-sm" placeholder={field.placeholder} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <button onClick={handleExportToExcel} className="bg-green-500 text-white py-2 px-4 rounded">Export to Excel</button>
          <button onClick={() => setCurrentPage(1)} className="bg-red-500 text-white py-2 px-4 rounded">Clear Filters</button>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-yellow-500 text-white" : "bg-gray-300"}`} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

      {!loading ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                {["Sr No.", "Full Name", "District", "Talukka", "Phone", "School", "Coordinator", "Class", "Actions"].map((header, index) => (
                  <th key={index} className="py-2 px-4 border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{student.firstName} {student.middleName} {student.lastName}</td>
                  <td className="py-2 px-4 border">{student.district}</td>
                  <td className="py-2 px-4 border">{student.talukka}</td>
                  <td className="py-2 px-4 border">{student.phone}</td>
                  <td className="py-2 px-4 border">{student.school}</td>
                  <td className="py-2 px-4 border">{student.coordinator}</td>
                  <td className="py-2 px-4 border">{student.className}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/admin/update-student/${student._id}`} className="text-blue-500 mr-2">Update</Link>
                    <button onClick={() => handleDelete(student._id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <HashLoader color="#1276e2" />}
    </div>
  );
};

export default StudentData;
