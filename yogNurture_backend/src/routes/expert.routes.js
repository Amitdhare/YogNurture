const express = require("express");
const router = express.Router();

// 🔹 Expert consultation route
router.post("/consult", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // TODO: Save to DB or send email in future
  return res.status(200).json({ success: true, message: "Request submitted successfully!" });
});

module.exports = router;
