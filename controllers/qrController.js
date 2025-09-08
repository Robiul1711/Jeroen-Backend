const QrCode = require("../models/QrCode");

// POST: create QR code
const createQrCode = async (req, res) => {
  try {
    const { data, type } = req.body;
    if (!data || !type) return res.status(400).json({ msg: "Data and type are required" });

    const qr = await QrCode.create({
      data,
      type,
      user: req.user?._id, // if you have auth middleware
    });

    res.status(201).json({ msg: "QR code saved", qr });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET: fetch QR code history
const getQrHistory = async (req, res) => {
  try {
    const qrs = await QrCode.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.json(qrs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createQrCode, getQrHistory };
