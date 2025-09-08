const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // For password reset
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // For OTP
  otp: String,
  otpExpire: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
