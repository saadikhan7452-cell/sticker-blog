const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

// Video details save karne ka route
router.post('/submit-video', async (req, res) => {
  try {
    const { name, email, videoUrl } = req.body;
    
    const newSubmission = new Submission({
      name,
      email,
      videoUrl
    });

    await newSubmission.save();
    res.status(201).json({ message: "✅ Data saved in StickerBlogDB!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;