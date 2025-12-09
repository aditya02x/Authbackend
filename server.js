// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug logs for environment variables
console.log("PORT:", process.env.PORT || 5000);
console.log("MONGO_URL:", process.env.MONGO_URL ? "Loaded" : "Not loaded");

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
