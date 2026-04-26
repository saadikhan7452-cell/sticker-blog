const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DEBUGGING: URI CHECK ---
// Agar terminal mein "❌" aaye to samajh lein .env file backend folder mein nahi hai
console.log("Database Status:", process.env.MONGO_URI ? "✅ URI Loaded" : "❌ URI Missing");

// --- DATABASE CONNECTION ---
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
    serverSelectionTimeoutMS: 5000 // Fails fast after 5s instead of the default 30s
})
    .then(() => console.log("🔥 MongoDB Connected Successfully, Saad Bhai!"))
    .catch(err => {
        console.error("❌ MongoDB Connection Failed!");
        console.error("Reason:", err.message);
        if (err.message.includes('querySrv') || err.message.includes('Could not connect')) {
            console.error("\n🚨 URGENT: Your current Wi-Fi/ISP is blocking MongoDB (Port 27017).");
            console.error("👉 FIX: Disconnect from Wi-Fi, connect your PC to your phone's Mobile Hotspot (4G/5G), and try again!");
        }
        process.exit(1); // Exit process with failure so you know it didn't connect
    });

// --- MODELS ---
// Hum yahan define kar rahe hain taake alag file ka masla na ho abhi
const Submission = mongoose.model('Submission', new mongoose.Schema({
    name: { type: String, default: "Anonymous" },
    email: { type: String, default: "Not Provided" },
    videoUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES ---

// 1. User Submission Route (Form se data yahan aayega)
app.post('/api/submit-video', async (req, res) => {
    try {
        const { name, email, videoUrl } = req.body;
        if (!videoUrl) return res.status(400).json({ msg: "Video URL is required" });

        const newSubmission = new Submission({ name, email, videoUrl });
        await newSubmission.save();
        
        res.status(201).json({ message: "✅ Video details saved to StickerBlogDB!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Admin Dashboard Route (Videos yahan se fetch hongi)
app.get('/api/admin/all-videos', async (req, res) => {
    try {
        const videos = await Submission.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Filhal ke liye simple logic, baad mein isay DB se connect karlein
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
    console.log(`📡 API Link: http://localhost:${PORT}/api/admin/all-videos`);
});