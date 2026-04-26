import React from 'react';
import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // Ye line automatically aapki website ka address pakar legi
  // Agar localhost hai to localhost:5173/submit, agar live hai to stickerstories1.com/submit
  const liveSubmitLink = `${window.location.origin}/submit`;
  
  // QR Code generator (High quality 400x400)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(liveSubmitLink)}`;

  return (
    <div className={styles.qrContainer}>
      <div className={styles.qrCard}>
        {/* Is QR ko scan karne se seedha Submit.jsx wala page khulega */}
        <img 
          src={qrCodeUrl} 
          alt="Scan to Submit Story" 
          className={styles.qrImage} 
        />
        <div className={styles.label}>SCAN TO SUBMIT</div>
      </div>
    </div>
  );
}
