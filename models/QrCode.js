// models/QrCode.js
const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  data: { type: String, required: true },  // actual QR content (url, text, pdf path, vcard string)
  type: { type: String, enum: ["Link", "Text", "PDF", "V-card"], required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // optional if user auth exists
});

module.exports = mongoose.model("QrCode", qrCodeSchema);

