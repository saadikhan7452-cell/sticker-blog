import styles from './QRCodeGen.module.css';

export default function QRCodeGen() {
  
  // Aapka Google Form Link (Public View)
  const uploadFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScS4wgxpSkJksJVY8jdkZVyzestd-dlMD65Su8j2X8Wu9vDAg/viewform";
  
  // QR Code generator URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(uploadFormLink)}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.textSection}>
        <h2 className={styles.title}>Feature Your Story!</h2>
        <p className={styles.subtitle}>
          Want to see your stickers on our platform? Scan this QR code to upload your name and video directly to our community drive. 
          <br /><br />
          <strong>Pro Tip:</strong> Make sure you're subscribed to our channel to see if your video gets featured!
        </p>
      </div>
      <div className={styles.qrBox}>
        {/* Is image ko scan karne se seedha aapka form khulega */}
        <img 
          src={qrCodeUrl} 
          alt="Scan to upload video" 
          className={styles.qrImage} 
        />
      </div>
    </div>
  );
}