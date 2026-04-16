import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background image CSS se handle hogi */}
      <div className={styles.overlay}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Where Stories Stick Forever</span>
          
          <h1 className={styles.title}>
            Watch. Read. <span className={styles.highlight}>Collect.</span>
          </h1>
          
          <p className={styles.subtitle}>
            Hey StickerStories family! This isn’t just a blog; it’s a digital time machine. 
            Dive into long-form video stories, exclusive hauls, and the secret psychology 
            behind our favorite tiny pieces of art.
          </p>
          
          <div className={styles.btnGroup}>
            <Link to="/blogs" className={styles.btn}>
              Explore Stories
            </Link>
            <Link to="/submit" className={styles.btnSecondary}>
              Submit Your Video
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}