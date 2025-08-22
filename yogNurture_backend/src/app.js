const express = require('express');

const cors = require("cors");
const morgan = require("morgan");

// 🔹 Ab sirf ek hi route file import karenge
const fromRoutes = require("./routes/from.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔹 Routes use
app.use("/api", fromRoutes);

module.exports = app;


