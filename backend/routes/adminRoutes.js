const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
// Yahan aap middleware bhi laga sakte hain token verify karne ke liye

router.get('/submissions', async (req, res) => {
  try {
    const data = await Submission.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;