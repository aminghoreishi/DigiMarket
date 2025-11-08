import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "کاربر",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
    },
    password: {
      type: String,
      required: false, 
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials", 
    },
    image: {
      type: String, 
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
