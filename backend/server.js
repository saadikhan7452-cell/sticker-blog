const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("❌ Error: MONGO_URI is missing!");
    process.exit(1);
}

// --- DATABASE CONNECTION ---
mongoose.connect(dbURI)
.then(() => {
    console.log("🔥 MongoDB Connected Successfully on Render!");
})
.catch(err => {
    console.error("❌ Connection Error:", err.message);
});

// --- MODELS ---
const Submission = mongoose.model('Submission', new mongoose.Schema({
    name: { type: String, default: "Anonymous" },
    email: { type: String, default: "Not Provided" },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES ---

// 1. Submit Video (From Cloudinary)
app.post('/api/submit-video', async (req, res) => {
    try {
        const { name, email, videoUrl } = req.body;
        if (!videoUrl) return res.status(400).json({ msg: "Video URL is required" });
        await new Submission({ name, email, videoUrl }).save();
        res.status(201).json({ message: "✅ Video saved to database!" });
    } catch (err) {
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

// 3. Health Check Route
app.get('/', (req, res) => {
    res.send("<h1>🚀 StickerBlog Backend is Live on Render!</h1>");
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
}

module.exports = app;