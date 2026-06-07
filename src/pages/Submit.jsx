import React from 'react';
import styles from './Submit.module.css';

export default function Submit() {
  // Tumhara official Google Form Link
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScS4wgxpSkJksJVY8jdkZVyzestd-dlMD65Su8j2X8Wu9vDAg/viewform";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Header Title Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Feature Your <span className={styles.highlight}>Story!</span></h1>
          <p className={styles.subtitle}>
            Upload your video logs directly to our secure cloud storage grid.
          </p>
        </div>
        
        {/* Portal Card Setup */}
        <div className={styles.cardContainer}>
          <div className={styles.uploadCard}>
            
            {/* Cloud Icon wrapper */}
            <div className={styles.iconWrapper}>
              <svg 
                className={styles.cloudIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 12v9"></path>
                <path d="M16 16l-4-4-4 4"></path>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                <path d="M16 16l-4-4-4 4"></path>
              </svg>
            </div>

            <h2 className={styles.cardTitle}>Google Drive Upload Portal</h2>
            
            <p className={styles.cardDesc}>
              Click the button below to open our official submission form. You can upload videos up to 100MB/1GB instantly using your Google account connection!
            </p>

            {/* Direct Link Action - Open in new tab */}
            <a 
              href={formUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.uploadButton}
            >
              OPEN UPLOAD PORTAL 🚀
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}