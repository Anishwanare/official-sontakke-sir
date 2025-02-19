import express from "express";
import {
  coordinatorRegister,
  getCoordinators,
} from "../controller/CoordinatorController.js"; // Ensure this is correctly imported
import { isAdminAuthenticated, isAuthorized, isSchoolAuthenticated } from "../middleware.js/auth.js";

const router = express.Router();

router.post("/register", isAdminAuthenticated, coordinatorRegister);
router.get("/fetch", isAdminAuthenticated, getCoordinators);

export default router;
