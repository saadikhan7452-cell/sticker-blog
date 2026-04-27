import React from 'react';
import styles from './About.module.css';

export default function About() {
  // QR generator logic removed for static image consistency.

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>About <span className={styles.highlight}>StickerBlog</span></h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280', marginTop: '10px' }}>
          The ultimate home for sticker collectors, artists, and enthusiasts.
        </p>
      </div>

      {/* Main Content Area */}
      <div className={styles.contentBox}>
        <p>
          Welcome to StickerBlog, the number one destination for everything related to stickers. Whether you are a fan of holographic vinyls, custom die-cuts, or vintage collections, you have found your community.
        </p>
        
        <h3 style={{color: '#7c3aed', marginTop: '20px'}}>Our Mission</h3>
        <p>
          We believe that every sticker tells a story. Our mission is to provide a premium platform where creators can share their in-depth reviews, massive hauls, and design tutorials through high-quality, long-form videos and detailed articles.
        </p>
      </div>

      {/* Responsive Side-by-Side Section */}
      <div className={styles.flexSection}>
        <div className={styles.textSide}>
          <h3>Join the Community</h3>
          <p>
            Ready to share your sticker collection with the world? Our platform is built for creators like you. Scan the QR code to submit your story, upload your videos, and become a part of the fastest-growing sticker family online.
          </p>
          <p style={{marginTop: '15px', fontWeight: '600', color: '#4b5563'}}>
            We can't wait to see your craft!
          </p>
        </div>
        
        <div className={styles.qrSide}>
          {/* Static Cinematic Image Used Here */}
          <img 
            src="/images/qr-cinematic.png" 
            alt="Scan to Join" 
            className={styles.qrImageSide}
          />
          <p className={styles.qrLabelText}>
            SCAN TO SUBMIT
          </p>
        </div>
      </div>
    </div>
  );
}