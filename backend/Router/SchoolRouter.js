import express from "express";
import {
  deleteSchool,
  editSchool,
  fetchSchool,
  getAllSchools,
  // getSchoolById,
  schoolLogin,
  schoolRegistration,
} from "../controller/SchoolController.js";
import { isAdminAuthenticated, isSchoolAuthenticated } from "../middleware.js/auth.js";

const router = express.Router();

// crud in school

router.post("/register", isAdminAuthenticated, schoolRegistration);
router.get("/get-schools", isAdminAuthenticated,getAllSchools);
router.post("/login", schoolLogin);
router.put("/edit-school/:id", isAdminAuthenticated, editSchool); 
router.delete("/delete-school/:id", isAdminAuthenticated, deleteSchool);
// router.get("/get-school/:id", isSchoolAuthenticated, getSchoolById);

// me
router.get("/fetch-me", isSchoolAuthenticated, fetchSchool)

export default router;
