import User from "../models/User.js";
import axios from "axios";
import fs from "fs";
import sharp from "sharp";
import path from "path";

// Fetch website logo function
const fetchWebsiteLogo = async (website) => {
  try {
    const domain = new URL(website).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch (error) {
    return null;
  }
};

// Get Latest Serial Number
const getNextSerialNumber = async () => {
  const lastUser = await User.findOne().sort({ serialNumber: -1 });
  return lastUser ? lastUser.serialNumber + 1 : 1;
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const { name, username, password, website } = req.body;

    // Check for unique username per website
    const existingUser = await User.findOne({ username, website });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists for this website" });
    }

    // Fetch logo automatically
    const logo = await fetchWebsiteLogo(website);

    // Generate Serial Number
    const serialNumber = await getNextSerialNumber();

    const newUser = new User({ serialNumber, name, username, password, website, logo });
    await newUser.save();
    res.json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ serialNumber: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching users", error: error.message });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    updatedData.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: "Error updating user", error: error.message });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting user", error: error.message });
  }
};
