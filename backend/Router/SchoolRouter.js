import express from "express";
import {
  deleteSchool,
  editSchool,
  fetchSchool,
  getAllSchools,
  getSchoolById,
  schoolLogin,
  schoolRegistration,
} from "../controller/SchoolController.js";
import { isAdminAuthenticated, isAuthorized, isSchoolAuthenticated } from "../middleware.js/auth.js";

const router = express.Router();

// crud in school

router.post("/register", isAdminAuthenticated, isAuthorized("Admin"), schoolRegistration);
router.get("/get-schools", isAdminAuthenticated, isAuthorized('Admin', 'School'), getAllSchools);
router.post("/login", schoolLogin);
router.put("/edit-school/:id", isAdminAuthenticated, isAuthorized("Admin"), editSchool);
router.delete("/delete-school/:id", isAdminAuthenticated, isAuthorized("Admin"), deleteSchool);
router.get("/get-school/:id", isAdminAuthenticated, isAuthorized("Admin"), getSchoolById);

// me
router.get("/fetch-me", isSchoolAuthenticated, isAuthorized("School"), fetchSchool)

export default router;
