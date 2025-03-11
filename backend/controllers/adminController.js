import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

// Admin Signup
export const signupAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      createdDate: new Date(),
    });

    await newAdmin.save();
    res.status(201).json({ msg: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error creating admin", error: error.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
};
