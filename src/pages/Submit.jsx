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
    setStatus('🚀 Uploading video to cloud (this may take a minute)...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];

      try {
        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (!SCRIPT_URL) {
           setStatus('❌ Error: Google Script URL is missing!');
           return setLoading(false);
        }

        // Send base64 video directly to Google Drive via Apps Script
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams({
            fileName: file.name,
            mimeType: file.type,
            fileData: base64Data,
            name: e.target.userName.value || "Anonymous",
            email: e.target.userEmail.value || "Not Provided"
          })
        });

        setStatus('🎉 Success! Your video is now in Google Drive.');
        setLoading(false);
        setFile(null);
        e.target.reset();
      } catch (err) {
        console.error(err);
        setStatus('❌ Error: Google Drive upload failed.');
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
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