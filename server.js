const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://jereon-qr-code-generator.netlify.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Preflight
app.options("*", cors());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./router/authRoutes.js"));
app.use("/api/qr", require("./router/qrRoutes.js"));
app.use("/api/user", require("./router/userRoutes.js"));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));


