import express from 'express';
import { AdminLogin, AdminRegister, fetchAdmin, Logout, uploadFileToSchool, uploadFileToStudent } from '../controller/AdminController.js';
import { isAdminAuthenticated, isAuthorized } from '../middleware.js/auth.js';


const router = express.Router();

router.post("/register", AdminRegister)
router.post("/login", AdminLogin)
router.get('/fetch/me', isAdminAuthenticated, isAuthorized("Admin"), fetchAdmin)
router.post('/upload-file-to-school/:id', isAdminAuthenticated, isAuthorized("Admin"), uploadFileToSchool)
router.post('/upload-file-to-student/:id', isAdminAuthenticated, isAuthorized("Admin"), uploadFileToStudent)


// this router is for admin and school,students, coordinator
router.get("/logout", Logout)

export default router;