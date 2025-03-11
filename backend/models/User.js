import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String }, // Store logo URL
    file: { type: String }, // Stores file path (PDF/Image)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
