import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Submit.module.css';

export default function Submit() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('❌ Please select a video!');

    setLoading(true);
    setStatus('🚀 Uploading to cloud...');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sticker_video"); // Apna Cloudinary preset yahan likhen
    formData.append("name", e.target.userName.value);
    formData.append("email", e.target.userEmail.value);

    try {
      // 1. Send to Live Backend ya Localhost (Backend handles Cloudinary + DB)
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/submit-video`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setStatus('✅ Success! Your story has been submitted.');
      setLoading(false);
      setFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus('❌ Error: Upload failed. Check backend connection.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Feature Your <span className={styles.highlight}>Story!</span></h1>
          <p className={styles.subtitle}>
            Cloudinary powered high-speed uploads. Submit your video to join our platform!
          </p>
        </div>
        
        <div className={styles.contentGrid}>
          {/* LEFT SIDE: Direct Upload Form */}
          <div className={styles.formSection}>
            <form onSubmit={handleUpload} className={styles.customForm}>
              <div className={styles.inputGroup}>
                <label>Full Name (Optional)</label>
                <input 
                  type="text" 
                  name="userName" 
                  placeholder="Enter your name" 
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address (Optional)</label>
                <input 
                  type="email" 
                  name="userEmail" 
                  placeholder="Enter your email" 
                />
              </div>
               <div className={styles.fileUploadBox}>
                  <input 
                    type="file" 
                    id="video" 
                    accept="video/*" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className={styles.hiddenInput} 
                  />
                  <label htmlFor="video" className={styles.fileLabel}>
                    {file ? `📂 ${file.name}` : "📁 Click to Choose Video"}
                  </label>
               </div>
               <button type="submit" className={styles.submitBtn} disabled={loading}>
                 {loading ? "UPLOADING..." : "SUBMIT STORY"}
               </button>
               {status && <p className={styles.statusMsg}>{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}