import React from 'react';
import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // Aapka wahi purana Google Form/Drive Link
  const uploadFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScS4wI-Yp8Z5K4Y-7-6_5-4-3-2-1/viewform"; 

  // QR Code generator URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(uploadFormLink)}`;

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
        {/* Is image ko scan karne se seedha aapka purana link khulega */}
        <img 
          src={qrCodeUrl} 
          alt="Scan to upload video" 
          className={styles.qrImage} 
        />
      </div>
    </div>
  );
}
