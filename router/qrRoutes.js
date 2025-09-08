
const express = require("express");
const router = express.Router();
const { createQrCode, getQrHistory } = require("../controllers/qrController");
// const authMiddleware = require("../middleware/auth"); // optional

router.post("/create", /* authMiddleware, */ createQrCode);
router.get("/history", /* authMiddleware, */ getQrHistory);

module.exports = router;
