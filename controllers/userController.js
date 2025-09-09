const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
// ================= GET CURRENT USER =================
const getUserProfile = async (req, res) => {
  try {
    res.json(req.user); // req.user is set by middleware
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= UPDATE USER INFO =================
const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= CHANGE PASSWORD =================
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// ======== UPLOAD IMAGE =========
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Wrap Cloudinary upload_stream in a Promise
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_images" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(fileBuffer); // send file buffer to Cloudinary
      });
    };

    // Upload image
    const result = await streamUpload(req.file.buffer);

    // Save image URL in DB
const user = await User.findByIdAndUpdate(
  req.user._id,
  { image: result.secure_url },
  { new: true }
);

    res.json({
      success: true,
      msg: "Profile image updated successfully",
      user,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update user info
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, user: updatedUser, msg: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  updateProfile,
  uploadProfileImage

};
