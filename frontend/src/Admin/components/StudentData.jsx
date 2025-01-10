import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';



const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/get-students`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const students = data?.getStudent || [];
        setStudentData(students);

        // Extract unique schools, classes, and coordinators from student data
        const uniqueSchools = [...new Set(students.map((student) => student.school))];
        const uniqueClasses = [...new Set(students.map((student) => student.className))];
        const uniqueCoordinators = [...new Set(students.map((student) => student.coordinator))];

        setSchools(uniqueSchools);
        setClasses(uniqueClasses);
        setCoordinators(uniqueCoordinators);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleClearFilter = () => {
    setSelectedSchool("");
    setSelectedClass("");
    setSelectedCoordinator("");
    setSearchTerm(""); // Clear the search term
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_BASE_URL}/api/v3/student/delete/student/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const updatedData = studentData.filter((student) => student._id !== id);
      setStudentData(updatedData);

      alert("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
    }
  };




  const filteredData = studentData.filter((student) => {
    return (
      (!selectedSchool || student.school === selectedSchool) &&
      (!selectedClass || student.className === selectedClass) &&
      (!selectedCoordinator || student.coordinator === selectedCoordinator) &&
      (searchTerm === "" ||
        `${student.firstName} ${student.middleName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });


  // Download file to excel

  const handleExportToExcel = () => {
    const exportData = filteredData.map((student, index) => ({
      "Sr No.": index + 1,
      "Full Name": `${student.firstName} ${student.middleName} ${student.lastName}`,
      Phone: student.phone,
      School: student.school,
      Coordinator: student.coordinator,
      Class: student.className,
      Talukka: student.talukka,
      District: student.district,
      "Student Enroll Date": new Date(student.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);

    // Add header with school name on the first row
    const schoolHeader = selectedSchool || "All Schools";
    XLSX.utils.sheet_add_aoa(worksheet, [[`School: ${schoolHeader}`]], { origin: "A1" });

    // Apply styling for the school name header
    worksheet["A1"].s = {
      font: {
        name: "Arial",
        sz: 30, // Font size
        color: { rgb: "078400" }, // Green color
        bold: true, // Bold text
      },
    };

    // Add data starting from the third row
    XLSX.utils.sheet_add_aoa(worksheet, [Object.keys(exportData[0])], { origin: "A3" });
    XLSX.utils.sheet_add_json(worksheet, exportData, { origin: "A4", skipHeader: true });

    // Adjust column widths based on the content
    const maxWidths = [];
    exportData.forEach((row) => {
      Object.values(row).forEach((value, colIndex) => {
        const cellLength = value ? value.toString().length : 10;
        maxWidths[colIndex] = Math.max(maxWidths[colIndex] || 10, cellLength);
      });
    });

    worksheet["!cols"] = maxWidths.map((width) => ({ wch: width + 2 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(
      workbook,
      `${selectedSchool || "All-Schools"}-${selectedClass || "All-Classes"}.xlsx`
    );
  };

  return (
    <div className="p-4">
      <p>Total Student {filteredData.length}</p>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="w-full md:w-1/3">
            <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700 mb-1">
              Search by Name
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter student name"
            />
          </div>

          {/* Other Filters */}
          {/* School Filter Dropdown */}
          <div className="w-full md:w-1/3">
            <label htmlFor="schoolSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select School
            </label>
            <select
              id="schoolSelect"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Schools</option>
              {schools.map((school, index) => (
                <option key={index} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter Dropdown */}
          <div className="w-full md:w-1/3">
            <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Classes</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Coordinator Filter Dropdown */}
          <div className="w-full md:w-1/3">
            <label htmlFor="coordinatorSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select Coordinator
            </label>
            <select
              id="coordinatorSelect"
              value={selectedCoordinator}
              onChange={(e) => setSelectedCoordinator(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Coordinators</option>
              {coordinators.map((coordinator, index) => (
                <option key={index} value={coordinator}>
                  {coordinator}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap space-x-5">
          <button
            onClick={handleExportToExcel}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
          >
            Export to Excel
          </button>
          <button
            onClick={handleClearFilter}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* Student Data Table */}
      {filteredData.length > 0 ? (
        <div className="overflow-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {[
                  "Sr No.",
                  "Full Name",
                  "Phone",
                  "School",
                  "Coordinator",
                  "Class",
                  "Talukka",
                  "District",
                  "Created At",
                  "Actions",
                ].map((header, index) => (
                  <th key={index} className="py-2 px-4 border-b">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">
                    {`${student.firstName} ${student.middleName} ${student.lastName}`}
                  </td>
                  <td className="py-2 px-4 border-b">{student.phone}</td>
                  <td className="py-2 px-4 border-b">{student.school}</td>
                  <td className="py-2 px-4 border-b">{student.coordinator}</td>
                  <td className="py-2 px-4 border-b">{student.className}</td>
                  <td className="py-2 px-4 border-b">{student.talukka}</td>
                  <td className="py-2 px-4 border-b">{student.district}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <Link
                      to={`/admin/update-student/${student._id}`}
                      className="text-blue-500"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-500"
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
        <div className="text-center py-4">No students found!</div>
      )}
    </div>
  );
};

export default StudentData;
