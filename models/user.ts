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
      unique: true, // هر ایمیل فقط یک‌بار
      lowercase: true,
    },
    password: {
      type: String,
      required: false, // چون برای کاربران گوگل وجود ندارد
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
      default: "credentials", // برای تفکیک نوع ثبت‌نام
    },
    image: {
      type: String, // از گوگل برمی‌گردد
    },
    refreshToken: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
