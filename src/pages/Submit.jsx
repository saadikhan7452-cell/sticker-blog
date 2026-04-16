import { QrCode, Smartphone } from 'lucide-react';
import styles from './Submit.module.css';

export default function Submit() {
  // Aapke Google Form ka link (QR Code ke liye)
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScS4wgxpSkJksJVY8jdkZVyzestd-dlMD65Su8j2X8Wu9vDAg/viewform";
  
  // API jo is link ka QR Code automatically banayegi
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formUrl)}`;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Feature Your <span className={styles.highlight}>Story!</span></h1>
          <p className={styles.subtitle}>
            Have an amazing sticker haul or tutorial? Submit your video to get featured on our platform!
          </p>
        </div>
        
        <div className={styles.contentGrid}>
          {/* LEFT SIDE: Form */}
          <div className={styles.formSection}>
            <iframe 
              src={`${formUrl}?embedded=true`}
              width="100%" 
              height="800" 
              frameBorder="0" 
              marginHeight="0" 
              marginWidth="0"
              title="Submit Video Form"
              className={styles.iframe}
            >
              Loading…
            </iframe>
          </div>

          {/* RIGHT SIDE: QR Code */}
          <div className={styles.qrSection}>
            <div className={styles.qrCard}>
              <QrCode size={40} className={styles.qrIcon} />
              <h3>On Mobile?</h3>
              <p>Scan this QR code with your phone's camera to open the submission form instantly.</p>
              
              <div className={styles.qrImageWrapper}>
                {/* Yeh img tag automatically asli QR code dikhayega */}
                <img src={qrCodeImageUrl} alt="Scan to submit" />
              </div>
              
              <div className={styles.mobileTip}>
                <Smartphone size={16} /> Works on iOS & Android
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}