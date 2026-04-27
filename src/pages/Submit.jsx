import React, { useState } from 'react';
import styles from './Submit.module.css';

export default function Submit() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(''); // Purana error clear kar dein
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStatus('');
    // Input field ko reset karne ke liye
    document.getElementById('video').value = "";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('❌ Please select a video!');

    setLoading(true);
    setStatus('🚀 Uploading video to Google Drive...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result.split(',')[1];

      try {
        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (!SCRIPT_URL) {
           setStatus('❌ Error: Google Script URL is missing in Vercel!');
           return setLoading(false);
        }

        // Send base64 video directly to Google Drive via Apps Script
        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            fileName: file.name,
            mimeType: file.type,
            fileData: base64Data,
            name: e.target.userName.value || "Anonymous",
            email: e.target.userEmail.value || "Not Provided"
          })
        });

        const result = await response.json();

        if (result.status === "success") {
          setStatus('🎉 Success! Your story is now in Google Drive.');
          setFile(null);
          e.target.reset();
        } else {
          setStatus('❌ Upload failed: ' + result.error);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setStatus('❌ Error: Connection failed.');
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
            Direct Google Drive uploads. Submit your video to join our platform!
          </p>
        </div>
        
        <div className={styles.contentGrid}>
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
                {!file ? (
                  <>
                    <input 
                      type="file" 
                      id="video" 
                      accept="video/*" 
                      onChange={handleFileChange} 
                      className={styles.hiddenInput} 
                    />
                    <label htmlFor="video" className={styles.fileLabel}>
                      📁 Click to Choose Video
                    </label>
                  </>
                ) : (
                  <div className={styles.selectedFileDisplay}>
                    <p className={styles.fileNameText}>📂 {file.name}</p>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className={styles.removeBtn}
                    >
                      Remove & Change Video
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading || !file}>
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