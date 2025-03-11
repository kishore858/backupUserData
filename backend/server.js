import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.json({ msg: "API is running" }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
