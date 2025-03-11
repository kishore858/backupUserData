import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser); // Create user
router.get("/", getUsers); // Get all users
router.put("/:id", updateUser); // Update user by ID
router.delete("/:id", deleteUser); // Delete user by ID

export default router;
