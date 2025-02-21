import express from 'express';
import { deleteStudent, editStudentData, getStudentById, getStudents, studentRegister } from '../controller/studentController.js';
import { isAdminAuthenticated, isAuthorized } from '../middleware.js/auth.js';
// import { isStudentAuthenticated, isStudentAuthorized } from '../middleware.js/auth.js';

const router = express.Router()

// crud for student
router.post("/register", isAdminAuthenticated, isAuthorized("Admin"), studentRegister)
router.get("/get-students", isAdminAuthenticated, isAuthorized("Admin"), getStudents);
router.put("/update/student/:id", isAdminAuthenticated, isAuthorized("Admin"), editStudentData)
router.delete("/delete/student/:id", isAdminAuthenticated, isAuthorized("Admin"), deleteStudent)

// 
router.get("/getme/student/:id", getStudentById)

export default router;