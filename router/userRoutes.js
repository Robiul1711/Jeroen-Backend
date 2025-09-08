const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes
router.get("/me", authMiddleware, getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
