import express from "express";
import { deleteMessage, getAllMessages, sendMessage } from "../controller/MessageController.js";
import { isAdminAuthenticated, isAuthorized } from "../middleware.js/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/get", isAdminAuthenticated, isAuthorized("Admin"), getAllMessages);
router.put("/delete/:id", isAdminAuthenticated, deleteMessage);

export default router;
