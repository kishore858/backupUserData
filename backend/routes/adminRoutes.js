import express from "express";
import { signupAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Admin Signup Route
router.post("/signup", signupAdmin);

// Admin Login Route
router.post("/login", loginAdmin);

export default router;
