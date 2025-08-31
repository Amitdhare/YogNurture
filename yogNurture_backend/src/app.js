// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// 🔹 Routes import
const authRoutes = require("./routes/auth.routes");
const solutionRoutes = require("./routes/solution.routes");
const expertRoutes = require("./routes/expert.routes");
const checkingRoutes = require("./routes/checking.routes");

const app = express();


app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // dono allow kar lo

}));


const path = require("path");

// solution folder ko serve karna
app.use("/solution", express.static(path.join(__dirname, "../YogNurture-frontend/solution")));



app.use(express.json());
app.use(morgan("dev"));

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ YogNurture Backend is Running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);        // signup, login
app.use("/api/form", solutionRoutes);
app.use("/api/expert", expertRoutes);     // expert consultation
app.use("/api/auth-check", checkingRoutes)



module.exports = app;



