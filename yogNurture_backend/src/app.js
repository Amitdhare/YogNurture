// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// 🔹 Routes import
const authRoutes = require("./routes/auth.routes");
const solutionRoutes = require("./routes/solution.routes");
const expertRoutes = require("./routes/expert.routes");

const app = express();

// ✅ Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/auth", authRoutes);        // signup, login
app.use("/api/solution", solutionRoutes); // getsolution
app.use("/api/expert", expertRoutes);     // expert consultation

// ✅ Fallback route (agar koi galat path ho)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;



