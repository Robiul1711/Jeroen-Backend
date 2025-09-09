const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadImage,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Protected Routes
router.get("/me", authMiddleware, getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);
// router.post("/upload-image", authMiddleware, upload.single("image"), uploadImage);
router.post("/upload-image",authMiddleware, upload.single("image"), uploadProfileImage);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;
