const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ CORS for local dev & Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite dev
      "https://authfront-nu.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
