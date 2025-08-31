// db.js
const mysql = require("mysql2");
const path = require("path");

// ✅ Load .env from current folder
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// ✅ Debug: Check if env variables loaded
if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error("❌ Environment variables missing. Check your .env file.");
  process.exit(1);
}

// ✅ Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// ✅ Test connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
    return;
  }
  console.log("✅ MySQL connected!");
});

module.exports = db;
