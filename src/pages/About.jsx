import QRCodeGen from '../components/QRCodeGen';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>About <span className={styles.highlight}>StickerBlog</span></h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          The ultimate home for sticker collectors, artists, and enthusiasts.
        </p>
      </div>

      <div className={styles.contentBox}>
        <p>
          Welcome to StickerBlog, the number one destination for everything related to stickers. Whether you are a fan of holographic vinyls, custom die-cuts, or vintage collections, you have found your community.
        </p>
        
        <h3>Our Mission</h3>
        <p>
          We believe that every sticker tells a story. Our mission is to provide a premium platform where creators can share their in-depth reviews, massive hauls, and design tutorials through high-quality, long-form videos and detailed articles.
        </p>
        
        <h3>Why Long-Form Videos?</h3>
        <p>
          While short clips are fun, true collectors know that appreciating the art, texture, and print quality of a sticker takes time. That is why our platform focuses on deep-dive video content that truly honors the craft.
        </p>
      </div>

      
      <QRCodeGen />
      
    </div>
  );
}