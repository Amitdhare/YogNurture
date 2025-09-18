const express = require("express");
const { getProfile, saveProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middleware/profileValidation");

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.post("/", authMiddleware, saveProfile);

module.exports = router;

