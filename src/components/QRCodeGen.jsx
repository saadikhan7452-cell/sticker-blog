import React from 'react';
import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // Ye logic aapke browser se current URL (localhost:5173) uthayega
  // Aur uske agay automatic '/submit' laga dega
  const currentUrl = window.location.origin;
  const targetPath = `${currentUrl}/submit`;
  
  // QR Code generator URL (Internal redirect ke liye)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetPath)}`;

  return (
    <div className={styles.fullScreen}>
      <div className={styles.qrContainer}>
        {/* Iska screenshot lena hai aapne */}
        <img 
          src={qrCodeUrl} 
          alt="Submit Page QR" 
          className={styles.qrCodeImage} 
        />
        <h2 className={styles.instruction}>SCAN TO SUBMIT VIDEO</h2>
        <p className={styles.debugPath}>Redirects to: {targetPath}</p>
      </div>
      
      <div className={styles.guideBox}>
        <p><strong>Next Steps:</strong></p>
        <p>1. Is QR ka saaf screenshot lein.</p>
        <p>2. Apne mobile se scan karke check karein (Submit page khulega).</p>
        <p>3. Is screenshot ko apne <strong>qr-cinematic.png</strong> design mein fit kar dein.</p>
      </div>
    </div>
  );
}