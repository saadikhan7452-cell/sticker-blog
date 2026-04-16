import styles from './Footer.module.css';

export default function Footer() {
  return (
  <footer className={styles.footer}>
  <div className={styles.footerContent}>
    <p className={styles.text}>
      Made with ❤️ and a lot of <span className={styles.highlight}>Holographic Stickers</span>.
    </p>
    <p className={styles.text}>
      © 2026 StickerStories. All rights reserved. Keep Peeling, Keep Healing!
    </p>
  </div>
</footer>
  );
}