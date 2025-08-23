const express = require("express");
const router = express.Router();

// 🔹 Solution route
router.post("/getsolution", (req, res) => {
  const { issue } = req.body;

  if (!issue) {
    return res.status(400).json({ success: false, message: "Issue is required" });
  }

  const text = issue.toLowerCase();
  let link = null;

  if (text.includes("nabhi") || text.includes("navel"))
    link = "solution/navel_displacement.html";
  else if (text.includes("back pain") || text.includes("backpain"))
    link = "solution/backpain.html";
  else if (text.includes("stress") || text.includes("anxiety"))
    link = "solution/stress.html";
  else if (text.includes("weight"))
    link = "solution/weight.html";

  if (!link) {
    return res.status(404).json({ success: false, message: "No solution found for this issue" });
  }

  return res.json({ success: true, link });
});

module.exports = router;
