const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

// FINAL CORS (Vercel + Local)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://authfront-nu.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
