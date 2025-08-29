const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");
const { signupValidation, loginValidation } = require("../middleware/auth.validate");

// console.log("signupValidation:", signupValidation);
// console.log("signup:", signup);



router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;
