const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ Connection Error:", err));

// Schema Update (Email Optional)
const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: "No Email" }, // Optional
  videoUrl: { type: String, required: true },
  country: { type: String, default: "Unknown" },
  date: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);

// Routes
app.post('/api/submit', async (req, res) => {
  try {
    const { name, email, videoUrl, country } = req.body;
    const newEntry = new Submission({ name, email: email || "No Email", videoUrl, country });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Story sent to Admin!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/data', async (req, res) => {
  const data = await Submission.find().sort({ date: -1 });
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));