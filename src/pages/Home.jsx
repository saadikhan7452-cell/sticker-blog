import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import { dummyBlogs } from '../data/dummyData';
import { PlayCircle, Heart, Share2, Sparkles } from 'lucide-react'; 
import styles from './Home.module.css';

export default function Home() {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    // Dynamically gets your current domain and points the QR to /submit
    const submitRoute = `${window.location.origin}/submit`;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(submitRoute)}`);
  }, []);

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

            {/* Right Side: QR Image */}
            <div className={styles.qrSide}>
              <div className={styles.qrCard} style={{ background: 'white', padding: '30px', borderRadius: '24px', display: 'inline-block', textAlign: 'center' }}>
                {qrUrl ? (
                  <img 
                    src={qrUrl} 
                    alt="Scan to Get Featured" 
                    style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ width: '200px', height: '200px', background: '#f3f4f6', borderRadius: '15px' }} />
                )}
                <p className={styles.qrBadge} style={{ marginTop: '20px', color: '#7c3aed', fontWeight: 'bold' }}>SCAN TO SUBMIT</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}