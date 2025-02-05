import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const TOTAL_ITEM = 30;

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/get-students`,
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );

        setLoading(false)
        const students = data?.getStudent || [];
        setStudentData(students);
        setSchools([...new Set(students.map((s) => s.school))]);
        setClasses([...new Set(students.map((s) => s.className))]);
        setCoordinators([...new Set(students.map((s) => s.coordinator))]);
      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Failed to fetch student data.");
        setLoading(false)
      }
    };

    fetchStudents();
  }, []);

  const handleClearFilter = () => {
    setSelectedSchool("");
    setSelectedClass("");
    setSelectedCoordinator("");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/delete/student/${id}`,
        { headers: { "Content-Type": "application/json" } }
      );

      setStudentData((prev) => prev.filter((s) => s._id !== id));
      toast.success("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const filteredData = useMemo(() => {
    return studentData.filter((student) =>
      (!selectedSchool || student.school === selectedSchool) &&
      (!selectedClass || student.className === selectedClass) &&
      (!selectedCoordinator || student.coordinator === selectedCoordinator) &&
      (searchTerm === "" ||
        `${student.firstName} ${student.middleName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  }, [studentData, selectedSchool, selectedClass, selectedCoordinator, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / TOTAL_ITEM);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * TOTAL_ITEM;
    return filteredData.slice(start, start + TOTAL_ITEM);
  }, [filteredData, currentPage]);

  const handleExportToExcel = () => {
    try {
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

      XLSX.writeFile(
        workbook,
        `${selectedSchool || "All-Schools"}-${selectedClass || "All-Classes"}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export data.");
    }
  };

  console.log("loading value", loading)
  const tableStyle = 'py-2 px-4 border'

  return (
    <div className="py-4">
      <p className="text-center my-2">{loading ? "Loading..." : `Total Students : ${filteredData.length}`}</p>

      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Search by Name", value: searchTerm, onChange: setSearchTerm, type: "text", placeholder: "Enter student name" },
            { label: "Select School", value: selectedSchool, onChange: setSelectedSchool, options: schools },
            { label: "Select Class", value: selectedClass, onChange: setSelectedClass, options: classes },
            { label: "Select Coordinator", value: selectedCoordinator, onChange: setSelectedCoordinator, options: coordinators },
          ].map((field, index) => (
            <div key={index} className="w-full">
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              {field.options ? (
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm"
                >
                  <option value="">All</option>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-4">
          <button onClick={handleExportToExcel} className="bg-green-500 text-white py-2 px-4 rounded">Export to Excel</button>
          <button onClick={handleClearFilter} className="bg-red-500 text-white py-2 px-4 rounded">Clear Filter</button>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-yellow-500 text-white" : "bg-gray-300"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {!loading ? <div className="overflow-x-auto mt-4">
        <table className="min-w-full border">
          <thead>
            <tr>{["Sr No.", "Full Name", "District", "Talukka", "Phone", "School", "Coordinator", "Class", "Actions"].map((header, index) => (
              <th key={index} className="py-2 px-4 border">{header}</th>
            ))}</tr>
          </thead>
          <tbody>
            {paginatedData.map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-100">
                <td className={tableStyle}>{index + 1}</td>
                <td className={tableStyle}>{student.firstName} {student.middleName} {student.lastName}</td>
                <td className={tableStyle}>{student.district}</td>
                <td className={tableStyle}>{student.talukka}</td>
                <td className={tableStyle}>{student.phone}</td>
                <td className={tableStyle}>{student.school}</td>
                <td className={tableStyle}>{student.coordinator}</td>
                <td className={tableStyle}>{student.className}</td>
                <td className={tableStyle}>
                  <Link to={`/admin/update-student/${student._id}`} className="text-blue-500 mr-2">Update</Link>
                  <button onClick={() => handleDelete(student._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="flex justify-center items-center h-screen" color="#1276e2"><HashLoader /></div>}
    </div>
  );
};

export default StudentData;
