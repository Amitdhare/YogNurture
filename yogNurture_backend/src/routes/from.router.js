const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { validateSignup, validateLogin } = require("../middleware/validate");

// 🔹 Signup route
router.post("/signup", validateSignup, signup);

// 🔹 Login route
router.post("/login", validateLogin, login);

// 🔹 Solution route
router.post("/getsolution", (req, res) => {
  const { issue } = req.body;
  let link = "";

  if (issue.includes("nabhi") || issue.includes("navel")) 
    link = "solution/navel_displacement.html";
  else if (issue.includes("back pain")) 
    link = "solution/backpain.html";
  else if (issue.includes("stress") || issue.includes("anxiety")) 
    link = "solution/stress.html";
  else if (issue.includes("weight")) 
    link = "solution/weight.html";

  if (link) return res.json({ link });
  else return res.json({ link: null });
});

// 🔹 Expert consultation route
router.post("/expert", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 👇 Future me yaha DB me save karna ya email bhejna
  return res.status(200).json({ message: "Request submitted successfully!" });
});

// 👇 Export sabhi routes
module.exports = router;



