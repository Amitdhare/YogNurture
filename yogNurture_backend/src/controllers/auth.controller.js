const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ✅ Signup with validation
const signup = async (req, res) => {
  // Step 1: Check for validation errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Step 2: Additional manual checks (optional but good)
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Internal server error" });

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Internal server error" });

          res.status(201).json({ message: "Signup successful!" });
        }
      );
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Internal server error" });

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "fallbackSecret",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful!",
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


