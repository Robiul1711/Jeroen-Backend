const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = {
  origin: "https://jereon-qr-code-generator.netlify.app",
  credentials: true
}

app.use(cors(allowedOrigins));

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./router/authRoutes.js"));
app.use("/api/qr", require("./router/qrRoutes.js"));
app.use("/api/user", require("./router/userRoutes.js"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));


