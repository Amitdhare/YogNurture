// src/server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

// 🔹 Server start
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
