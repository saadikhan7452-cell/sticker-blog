import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import QRCodeGen from '../components/QRCodeGen'; // Component import confirm hai
import { dummyBlogs } from '../data/dummyData';
import { PlayCircle, Heart, Share2, Sparkles } from 'lucide-react'; 
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Hero />

      <div className={styles.container}>
        
        {/* SECTION 2: LATEST VIDEOS */}
        <section className={styles.section}>
          <div className={styles.headerFlex}>
            <h2 className={styles.sectionTitle}>Latest Sticker Hauls</h2>
            <a href="https://www.youtube.com/@StickerStories1" target="_blank" className={styles.ctaLink}>
              View All on YouTube <PlayCircle size={20} />
            </a>
          </div>
          <div className={styles.grid}>
            {dummyBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

        {/* NEON BANNER */}
        <section className={styles.neonBanner}>
          <Sparkles className={styles.iconFloating} size={40} />
          <h2 className={styles.bannerTitle}>Never Miss a Sticker Drop!</h2>
          <p className={styles.bannerText}>Subscribe to @StickerStories1 for the world's most satisfying unboxings.</p>
          <a href="https://www.youtube.com/@StickerStories1?sub_confirmation=1" target="_blank" className={styles.mainCta}>
            SUBSCRIBE NOW (IT'S FREE!)
          </a>
        </section>

        {/* STATS SECTION */}
        <section className={styles.statsSection}>
          <div className={styles.statBox}>
            <h3>100+</h3>
            <p>Videos Published</p>
          </div>
          <div className={styles.statBox}>
            <h3>5k+</h3>
            <p>Stickers Reviewed</p>
          </div>
          <div className={styles.statBox}>
            <h3>Daily</h3>
            <p>Creative Inspiration</p>
          </div>
        </section>

        {/* SECTION 4: GET FEATURED (QR SECTION UPDATED) */}
        <section className={styles.qrSection}>
          <div className={styles.flexContainer}>
            {/* Left Side: Text */}
            <div className={styles.textSide}>
              <h2 className={styles.sectionTitle}>Get Featured</h2>
              <p className={styles.sectionDescription}>
                Want to showcase your sticker collection to thousands? Scan the QR code to submit your story, upload your videos, and get a chance to be featured on our main page!
              </p>
              <div className={styles.featurePoints}>
                <span>✓ High-quality long-form videos</span>
                <span>✓ Detailed sticker reviews</span>
                <span>✓ Global community reach</span>
              </div>
            </div>

            {/* Right Side: QR COMPONENT (Yahan ab image ki jagah component aayega) */}
            <div className={styles.qrSide}>
              <div className={styles.qrCard}>
                {/* Ab yahan purani image '/qr-cinematic.png' ke bajaye 
                  aapka naya dynamic QRCodeGen component chalega 
                */}
                <QRCodeGen />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}