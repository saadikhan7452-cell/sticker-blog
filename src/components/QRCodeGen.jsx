import React from 'react';
import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // 1. Ye line khud hi website ka base address pakar legi
  // Agar aap laptop par hain to 'localhost:5173' aur live hain to 'stickerstories.com'
  const siteUrl = window.location.origin;
  
  // 2. Iske agay humne apna submit page wala path jod diya
  const finalRedirectLink = `${siteUrl}/submit`;
  
  // 3. QR Code generator (Ab ye hamesha sahi page par le kar jayega)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(finalRedirectLink)}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>Feature Your Story!</h2>
        <p className={styles.subtitle}>
          Want to see your stickers on our platform? Scan this QR code to upload your video directly to our website!
        </p>
      </div>
      <div className={styles.qrBox}>
        {/* Is QR ko scan karte hi /submit page khulega */}
        <img 
          src={qrCodeUrl} 
          alt="Scan to submit" 
          className={styles.qrImage} 
        />
        <div style={{ color: '#000', fontSize: '12px', fontWeight: 'bold', marginTop: '8px' }}>
          SCAN TO SUBMIT
        </div>
      </div>
    </div>
  );
}