// controllers/qrController.js
const QrCode = require("../models/QrCode");

const createQrCode = async (req, res) => {
  try {
    const { data, type } = req.body;
    const userId = req.user._id; // from auth middleware

    const qr = new QrCode({
      data,
      type,
      user: userId,
    });

    await qr.save();

    res.status(201).json({ success: true, qr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get History (only logged-in user's QR codes)
const getQrHistory = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware

    const history = await QrCode.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; // assuming you have user info from auth middleware

    const qr = await QrCode.findById(id);
    if (!qr) {
      return res.status(404).json({ success: false, message: "QR code not found" });
    }

    // Only owner can delete
    if (!qr.user || qr.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this QR code" });
    }

    await qr.deleteOne();
    res.status(200).json({ success: true, message: "QR code deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createQrCode, getQrHistory, deleteQrCode };
