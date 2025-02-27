import express from 'express';
import { deleteStudent, editStudentData, fetchStudent, getStudentById, getStudents, studentLogin, studentRegister } from '../controller/studentController.js';
import { isAdminAuthenticated, isAuthorized, isStudentAuthenticated } from '../middleware.js/auth.js';
const router = express.Router()

// crud for student
router.post("/register", isAdminAuthenticated, isAuthorized("Admin"), studentRegister)
router.post("/login", studentLogin)

router.get("/get-students", isAdminAuthenticated, isAuthorized("Admin"), getStudents);
router.put("/update/student/:id", isAdminAuthenticated, isAuthorized("Admin"), editStudentData)
router.delete("/delete/student/:id", isAdminAuthenticated, isAuthorized("Admin"), deleteStudent)
router.get("/getme/:id", getStudentById)
    

// fetch me
router.get('/fetch-me', isStudentAuthenticated, isAuthorized('Student'), fetchStudent)



export default router;