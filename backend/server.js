require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Check if MONGO_URI is properly loaded
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in .env file");
    process.exit(1);
}

// Middleware
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.json({ msg: "API is running" });
});

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected...");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
