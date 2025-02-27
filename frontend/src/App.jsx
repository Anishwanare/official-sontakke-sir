import React, { lazy, Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProfile, fetchSchoolProfile, fetchStudentProfile } from "../store/slices/userSlice";

// Lazy-loaded components for better performance
const Home = lazy(() => import("./Pages/Home"));
const StudentLogin = lazy(() => import("./Student/StudentLogin"));
const SchoolLogin = lazy(() => import("./School/SchoolLogin"));
const SchoolDashboard = lazy(() => import("./School/SchoolDashboard"));
const StudentDashboard = lazy(() => import("./Student/StudentDashboard"));
const Registration = lazy(() => import("./School/Registration"));
const StudentRegistration = lazy(() => import("./Student/StudentRegistration"));
const CoordinatorRegistration = lazy(() => import("./School/CoordinatorRegistration"));
const Notice = lazy(() => import("./Components/notice"));
const NotFound = lazy(() => import("./Components/NotFound"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./Admin/components/AdminLogin"));
const Gallery = lazy(() => import("./Pages/Gallery"));
const UpdateStudent = lazy(() => import("./Admin/components/UpdateContent/UpdateStudent"));
const UpdateSchool = lazy(() => import("./Admin/components/UpdateContent/UpdateSchool"));
const Header = lazy(() => import("./Components/Header"));


const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.User);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Exclude Notice from specific routes
  const excludedPaths = ["/admin-login", "/admin-dashboard", "/school-login"];
  const showNotice = !excludedPaths.includes(location.pathname);


  useEffect(() => {
    dispatch(fetchAdminProfile());
    dispatch(fetchSchoolProfile());
    dispatch(fetchStudentProfile())
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen p-2">
          <HashLoader color="#1276e2" />
        </div>
      }
    >
      {/* <Header /> */}

      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/student-register" element={<StudentRegistration />} />
          <Route path="/school-register" element={<Registration />} />
          <Route path="/coordinator-register" element={<CoordinatorRegistration />} />
          <Route path="/gallery" element={<Gallery />} />

          {/* School Routes */}
          <Route
            path="/school-login"
            element={isAuthenticated && user?.role === "School" ? <Navigate to="/school-dashboard" replace /> : <SchoolLogin />}
          />
          <Route
            path="/school-dashboard"
            element={isAuthenticated && user?.role === "School" ? <SchoolDashboard /> : <Navigate to="/school-login" replace />}
          />


          {/* Student Routes */}

          <Route path="/student-login"
            element={isAuthenticated && user?.role === "Student" ? <Navigate to="/student-dashboard" replace /> : <StudentLogin />} />
          <Route path="/student-dashboard"
            element={isAuthenticated && user?.role === "Student" ? <StudentDashboard /> : <Navigate to={"/student-login"} replace />} />

          {/* Admin Routes */}
          <Route
            path="/admin-login"
            element={isAuthenticated && user?.role === "Admin" ? <Navigate to="/admin-dashboard" replace /> : <AdminLogin />}
          />
          <Route
            path="/admin-dashboard"
            element={isAuthenticated && user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/admin-login" replace />}
          />
          <Route
            path="/admin/update-student/:id"
            element={isAuthenticated && user?.role === "Admin" ? <UpdateStudent /> : <Navigate to="/admin-login" replace />}
          />
          <Route
            path="/admin/update-school/:id"
            element={isAuthenticated && user?.role === "Admin" ? <UpdateSchool /> : <Navigate to="/admin-login" replace />}
          />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer position="bottom-right" />
    </Suspense>
  );
};

export default App;
