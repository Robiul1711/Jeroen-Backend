const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Profile Info
    phone: { type: String, default: "" },
    image: { type: String, default: "" }, // Profile picture
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // For password reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // For OTP
    otp: String,
    otpExpire: Date,

    // Extra (optional)
    isActive: { type: Boolean, default: true }, // soft disable account
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

