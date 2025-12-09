const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ CORS fix
const allowedOrigins = [
  "http://localhost:5173", // Vite local dev
  "https://authfront-nu.vercel.app" // frontend deployed on Vercel
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // postman or curl
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'CORS policy blocked this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
