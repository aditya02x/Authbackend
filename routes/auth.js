const express = require('express');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// REGISTER (NO HASH)
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = await User.create({
            name,
            email,
            password   // <-- plain password
        });

        res.json({ message: "User registered", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// LOGIN (NO HASH)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // direct compare
        if (password !== user.password) {
            return res.status(400).json({ error: "Wrong password" });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
