import express from 'express';
import { AdminLogin, AdminRegister, fetchAdmin, Logout, uploadFileToSchool } from '../controller/AdminController.js';
import { isAdminAuthenticated, isAuthorized, isSchoolAuthenticated } from '../middleware.js/auth.js';


const router = express.Router();

router.post("/register", AdminRegister)
router.post("/login", AdminLogin)
router.get('/fetch/me', isAdminAuthenticated, isAuthorized("Admin"), fetchAdmin)
router.post('/upload-file-to-school/:schoolId', isAdminAuthenticated, isAuthorized("Admin"), uploadFileToSchool)


// this router is for all admin and school coordinator
router.get("/logout", Logout)

export default router;