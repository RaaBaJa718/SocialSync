const express = require("express");
const router = express.Router();

// Test Route - Ensure it's working
router.get("/", (req, res) => {
  res.send("Thoughts endpoint working!");
});

module.exports = router;