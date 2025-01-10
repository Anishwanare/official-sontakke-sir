import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const StudentData = () => {
  const [studentData, setStudentData] = useState([]);
  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCoordinator, setSelectedCoordinator] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    setSearchTerm("");
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

      setStudentData((prev) => prev.filter((student) => student._id !== id));
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
        "Student Enroll Date": new Date(student.createdAt).toLocaleDateString(),
      }));
  
      const worksheet = XLSX.utils.json_to_sheet([]);
  
      // Add a styled header row with the school name
      const headerRow = [[selectedSchool || "All Schools"]];
      XLSX.utils.sheet_add_aoa(worksheet, headerRow, { origin: "A1" });
  
      // Merge header cells to span across all columns
      const maxColumns = 9; // Adjust this based on the number of columns in exportData
      worksheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: maxColumns - 1 } },
      ];
  
      // Apply styles to the header row
      worksheet["A1"].s = {
        font: { sz: 25, bold: true },
        alignment: { horizontal: "center", vertical: "center" },
        fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
      };
  
      // Add the student data after the header
      XLSX.utils.sheet_add_json(worksheet, exportData, { origin: "A3" });
  
      // Set column widths
      worksheet["!cols"] = [
        { wch: 10 }, // Sr No.
        { wch: 30 }, // Full Name
        { wch: 20 }, // Phone
        { wch: 50 }, // School
        { wch: 50 }, // Coordinator
        { wch: 20 }, // Class
        { wch: 20 }, // Talukka
        { wch: 20 }, // District
        { wch: 20 }, // Student Enroll Date
      ];
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  
      XLSX.writeFile(
        workbook,
        `${selectedSchool || "All-Schools"}-${selectedClass || "All-Classes"}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export data to Excel.");
    }
  };
  


  return (
    <div className="p-4">
      <p>Total Students: {filteredData.length}</p>
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="searchInput" className="block text-sm font-medium mb-1">
              Search by Name
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
              placeholder="Enter student name"
            />
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="schoolSelect" className="block text-sm font-medium mb-1">
              Select School
            </label>
            <select
              id="schoolSelect"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">All Schools</option>
              {schools.map((school, index) => (
                <option key={index} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="classSelect" className="block text-sm font-medium mb-1">
              Select Class
            </label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
            >
              <option value="">All Classes</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label htmlFor="coordinatorSelect" className="block text-sm font-medium mb-1">
              Select Coordinator
            </label>
            <select
              id="coordinatorSelect"
              value={selectedCoordinator}
              onChange={(e) => setSelectedCoordinator(e.target.value)}
              className="w-full p-2 border rounded-md shadow-sm"
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

        <div className="mt-4">
          <button
            onClick={handleExportToExcel}
            className="mr-4 bg-green-500 text-white py-2 px-4 rounded"
          >
            Export to Excel
          </button>
          <button
            onClick={handleClearFilter}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Clear Filter
          </button>
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="mt-4 overflow-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                {["Sr No.", "Full Name", 'District', 'Talukka', "Phone", "School", "Coordinator", "Class", "Actions"].map(
                  (header, index) => (
                    <th key={index} className="py-2 px-4 border">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
                  <td className="py-2 px-4 border">{student.district}</td>
                  <td className="py-2 px-4 border">{student.talukka}</td>
                  <td className="py-2 px-4 border">{student.phone}</td>
                  <td className="py-2 px-4 border" title={student.school}>{student.school}</td>
                  <td className="py-2 px-4 border">{student.coordinator}</td>
                  <td className="py-2 px-4 border">{student.className}</td>
                  <td className="py-2 px-4 border">
                    <Link
                      to={`/admin/update-student/${student._id}`}
                      className="text-blue-500 mr-2"
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
        <p className="mt-4">No students found!</p>
      )}
    </div>
  );
};

export default StudentData;
