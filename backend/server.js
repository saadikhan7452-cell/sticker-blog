const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000 // Fails fast after 5s instead of the default 30s
})
    .then(() => console.log("🔥 MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err.message));

// --- MODELS ---
const Submission = mongoose.model('Submission', new mongoose.Schema({
    name: { type: String, default: "Anonymous" },
    email: { type: String, default: "Not Provided" },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES ---

// 1. Submit Video Data
app.post('/api/submit-video', async (req, res) => {
    try {
        const { name, email, videoUrl } = req.body;
        if (!videoUrl) return res.status(400).json({ msg: "Video URL is required" });

        const newSubmission = new Submission({ name, email, videoUrl });
        await newSubmission.save();
        
        res.status(201).json({ message: "✅ Video details saved to StickerBlogDB!" });
    } catch (err) {
        console.error("Submit Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Fetch All Videos (For Admin Dashboard)
app.get('/api/admin/all-videos', async (req, res) => {
    try {
        const videos = await Submission.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

// 3. Admin Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === "admin@stickerblog.com" && password === "saad123") {
    res.json({ token: "sticker-blog-secret-token", user: "Saad" });
  } else {
    res.status(401).json({ message: "Ghalat credentials!" });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
