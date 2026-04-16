import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import QRCodeGen from '../components/QRCodeGen';
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
              {/* Yahan Youtube ki jagah PlayCircle use kiya hai taake error na aaye */}
              View All on YouTube <PlayCircle size={20} />
            </a>
          </div>
          <div className={styles.grid}>
            {dummyBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

        {/* SECTION 3: NEON CTA BANNER */}
        <section className={styles.neonBanner}>
          <Sparkles className={styles.iconFloating} size={40} />
          <h2 className={styles.bannerTitle}>Never Miss a Sticker Drop!</h2>
          <p className={styles.bannerText}>Subscribe to @StickerStories1 for the world's most satisfying unboxings.</p>
          <a href="https://www.youtube.com/@StickerStories1?sub_confirmation=1" target="_blank" className={styles.mainCta}>
            SUBSCRIBE NOW (IT'S FREE!)
          </a>
        </section>

        {/* SECTION 4: COMMUNITY STATS */}
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

        {/* SECTION 5: SUBMIT YOUR STORY QR */}
        <section className={styles.qrSection}>
          <div className={styles.headerFlex}>
            <h2 className={styles.sectionTitle}>Get Featured</h2>
          </div>
          <QRCodeGen />
        </section>

      </div>
    </div>
  );
}