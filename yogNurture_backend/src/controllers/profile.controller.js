const db = require("../config/db");
const jwt = require("jsonwebtoken");

// ✅ Get Profile
const getProfile = (req, res) => {
  const userId = req.user.userId; // middleware se aaya

  const sql = "SELECT * FROM profiles WHERE userId = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (result.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(result[0]);
  });
};

// ✅ Save / Update Profile
const saveProfile = (req, res) => {
  const userId = req.user.userId; // middleware se aaya
  const { name, age, gender, weight, lifestyle, medical_history } = req.body;

  if (!name || !age || !gender) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sqlCheck = "SELECT * FROM profiles WHERE userId = ?";
  db.query(sqlCheck, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error", error: err });

    if (result.length > 0) {
      // update
      const sqlUpdate = `
        UPDATE profiles 
        SET name=?, age=?, gender=?, weight=?, lifestyle=?, medical_history=?
        WHERE userId=?`;
      db.query(
        sqlUpdate,
        [name, age, gender, weight, lifestyle, medical_history, userId],
        (err2) => {
          if (err2) return res.status(500).json({ message: "DB Error", error: err2 });
          res.json({ message: "Profile updated successfully" });
        }
      );
    } else {
      // insert
      const sqlInsert = `
        INSERT INTO profiles (userId, name, age, gender, weight, lifestyle, medical_history)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sqlInsert,
        [userId, name, age, gender, weight, lifestyle, medical_history],
        (err2) => {
          if (err2) return res.status(500).json({ message: "DB Error", error: err2 });
          res.json({ message: "Profile created successfully" });
        }
      );
    }
  });
};

module.exports = { getProfile, saveProfile };



