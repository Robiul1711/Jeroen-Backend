const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
};
