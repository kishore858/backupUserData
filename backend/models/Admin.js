import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin; // ✅ Ensure default export
