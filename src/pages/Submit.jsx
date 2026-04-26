import React, { useState } from 'react';
import axios from 'axios';
import styles from './Submit.module.css';

export default function SubmitStory() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(''); 
  const [progress, setProgress] = useState(0); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a video first!");

    const name = e.target.name.value;
    const email = e.target.email.value || "No Email Provided"; // Email optional kar diya

    try {
      setStatus('Fetching location...');
      let country = "Unknown";
      try {
        const locRes = await axios.get('https://ipapi.co/json/');
        country = locRes.data.country_name || "Unknown";
      } catch (err) {
        console.log("Location fetch failed, using default.");
      }

      setStatus('Uploading video to Cloudinary...');
      
      const cloudName = "ddhmskhql";
      const uploadPreset = "sticker_video"; 

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Cloudinary Upload
      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          },
        }
      );

      const videoUrl = cloudRes.data.secure_url;

      // Backend (MongoDB) par data bhej rahe hain
      setStatus('Sending to Admin Panel...');
      
      const response = await axios.post('http://localhost:5000/api/submit', {
        name: name,
        email: email,
        videoUrl: videoUrl,
        country: country
      });

      if (response.data.success || response.status === 201) {
        setStatus('✅ Success! Story sent to Admin.');
        setProgress(0);
        setFile(null);
        e.target.reset(); 
      }
    } catch (error) {
      console.error("Error details:", error);
      setStatus('❌ Error: Connection failed. Check if Backend is running.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Submit Your Sticker Story</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          required 
          className={styles.inputField} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email (Optional)" 
          className={styles.inputField} 
        />
        
        <div className={styles.fileBox}>
          <p>{file ? file.name : "Select your video clip"}</p>
          <input 
            type="file" 
            accept="video/*" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>

        {progress > 0 && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
        )}

        <p className={styles.statusText}>{status}</p>
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={progress > 0 && progress < 100}
        >
          {progress > 0 && progress < 100 ? 'Processing...' : 'Submit Story'}
        </button>
      </form>
    </div>
  );
}