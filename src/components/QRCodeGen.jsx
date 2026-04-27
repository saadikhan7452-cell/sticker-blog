import React from 'react';
import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // Dynamically get the current domain (works perfectly on Vercel, localhost, etc.) and append /submit
  const submitPageUrl = `${window.location.origin}/submit`; 

  // QR Code generator URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(submitPageUrl)}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>Feature Your Story!</h2>
        <p className={styles.subtitle}>
          Want to see your stickers on our platform? Scan this QR code to upload your video!
          <br /><br />
          <strong>Pro Tip:</strong> Make sure you're subscribed to our channel to stay updated.
        </p>
      </div>
      <div className={styles.qrBox}>
        {/* Is image ko scan karne se seedha aapki Vercel site ka /submit page khulega */}
        <img 
          src={qrCodeUrl} 
          alt="Scan to upload video" 
          className={styles.qrImage} 
        />
      </div>
    </div>
  );
}
