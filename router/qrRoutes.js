const express = require("express");
const router = express.Router();
const { createQrCode, getQrHistory, deleteQrCode } = require("../controllers/qrController");
const authMiddleware = require("../middleware/authMiddleware"); // your JWT auth middleware


router.post("/create", authMiddleware, createQrCode);      // user must be logged in to create
router.get("/history", authMiddleware, getQrHistory);      // user must be logged in to get their history
router.delete("/delete/:id", authMiddleware, deleteQrCode);   // only owner can delete
// router.post("/change-password", authMiddleware, changePassword); // user must be logged in to change password   
module.exports = router;
