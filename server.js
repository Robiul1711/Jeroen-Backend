const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB(); // 🔥 call database connection

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/auth", require("./router/authRoutes.js"));
app.use("/api/qr", require("./router/qrRoutes.js"));
app.use("/api/user", require("./router/userRoutes.js"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));

