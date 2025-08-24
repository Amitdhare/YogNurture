const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../middleware/auth.validate");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
