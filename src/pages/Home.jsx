import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import QRCodeGen from '../components/QRCodeGen';
import { dummyBlogs } from '../data/dummyData';
import { PlayCircle, Heart, Share2, Sparkles } from 'lucide-react'; 
import styles from './Home.module.css';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setVideos(data.reverse());
          setLoading(false);
        })
        .catch(error => {
          console.error("Videos fetch karne mein error aaya:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [API_URL]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
    }
    if (url.includes("drive.google.com")) {
      return url.replace("/view", "/preview").replace("open?id=", "file/d/") + "/preview";
    }
    return url;
  };

  const displayedVideos = showAll ? videos : videos.slice(0, 3);

  return (
    <div className={styles.homeWrapper}>
      <Hero />

      <div className={styles.container}>
        
        {/* SECTION 2: LATEST VIDEOS */}
        <section className={styles.section}>
          <div className={styles.headerFlex}>
            <h2 className={styles.sectionTitle}>Latest Sticker Hauls</h2>
            <a href="https://www.youtube.com/@StickerStories1" target="_blank" rel="noreferrer" className={styles.ctaLink}>
              View All on YouTube <PlayCircle size={20} />
            </a>
          </div>
          <div className={styles.grid}>
            {dummyBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

        {/* 🎬 DYNAMIC SECTION: COMMUNITY VIDEOS */}
        <section className={styles.section}>
          <div className={styles.headerFlex}>
            <h2 className={styles.sectionTitle}>Community Featured Videos</h2>
          </div>
          
          {loading ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>Loading...</p>
          ) : videos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No videos available.</p>
          ) : (
            <>
              <div className={styles.grid}>
                {displayedVideos.map((video) => (
                  <div key={video.id} className={styles.videoCard}>
                    <div className={styles.iframeWrapper}>
                      <iframe 
                        src={getEmbedUrl(video.videoUrl)} 
                        title={video.name} 
                        className={styles.videoIframe}
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className={styles.videoCardBody}>
                      <h4 className={styles.videoCardTitle}>{video.name}</h4>
                      <span className={styles.videoDate}>{new Date(video.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {videos.length > 3 && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <button onClick={() => setShowAll(!showAll)} className={styles.seeAllBtn}>
                    {showAll ? "Show Less" : "See All Videos"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* SECTION 3: NEON BANNER */}
        <section className={styles.neonBanner}>
          <Sparkles className={styles.iconFloating} size={40} />
          <h2 className={styles.bannerTitle}>Never Miss a Sticker Drop!</h2>
          <p className={styles.bannerText}>Subscribe to @StickerStories1 for the world's most satisfying unboxings.</p>
          <a href="https://www.youtube.com/@StickerStories1?sub_confirmation=1" target="_blank" rel="noreferrer" className={styles.mainCta}>
            SUBSCRIBE NOW (IT'S FREE!)
          </a>
        </section>

        {/* SECTION 4: STATS */}
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

        {/* SECTION 5: QR CODE SECTION */}
        <section className={styles.qrSection}>
          <div className={styles.flexContainer}>
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

            <div className={styles.qrSide}>
              <div className={styles.qrCard}>
                <img 
                  src="/qr-cinematic.png" 
                  alt="Scan to Get Featured" 
                  className={styles.homeQrImage} 
                />
                <p className={styles.qrBadge}>SCAN TO SUBMIT</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}