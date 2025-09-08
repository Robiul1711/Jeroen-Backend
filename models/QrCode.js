const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  data: { type: String, required: true },       // input data (link, text, etc.)
  type: { type: String, enum: ["Link", "Text", "PDF", "V-card"], required: true },
  createdAt: { type: Date, default: Date.now }, // creation date
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional: associate with user
});

module.exports = mongoose.model("QrCode", qrCodeSchema);
