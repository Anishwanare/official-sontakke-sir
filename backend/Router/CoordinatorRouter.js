import express from "express";
import {
  coordinatorRegister,
  getCoordinators,
} from "../controller/CoordinatorController.js"; // Ensure this is correctly imported
import { isAdminAuthenticated, isAuthorized } from "../middleware.js/auth.js";

const router = express.Router();

router.post("/register", isAdminAuthenticated, isAuthorized("Admin"), coordinatorRegister);
router.get("/fetch", isAdminAuthenticated, isAuthorized("Admin"), getCoordinators);

export default router;
