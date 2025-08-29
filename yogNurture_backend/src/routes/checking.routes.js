// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "your_jwt_secret_key";

// In-memory "database"
let users = [];

// --------------------
// Signup
// --------------------
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), name, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "Signup successful" });
});

// --------------------
// Login
// --------------------
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token
    });
});

module.exports = router;