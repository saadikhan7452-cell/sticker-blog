import styles from './Submit.module.css';

export default function Submit() {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScS4wgxpSkJksJVY8jdkZVyzestd-dlMD65Su8j2X8Wu9vDAg/viewform";

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
              title="Submit Video Form"
              className={styles.iframe}
            >
              Loading…
            </iframe>
          </div>

          {/* RIGHT SIDE: Direct Image from Client */}
          <div className={styles.imageCardContainer}>
            <img 
              src="/qr-cinematic.png" 
              alt="Scan to Submit" 
              className={styles.qrMainImage}
            />
            <div className={styles.imageOverlayText}>
               Scan with your phone to open the form
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}