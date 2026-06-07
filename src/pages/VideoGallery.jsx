import React, { useState, useEffect } from 'react';
import styles from './VideoGallery.module.css';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {loading ? (
          /* 🚀 Naya English Loader Class ke sath */
          <div className={styles.centerText}>LOADING VIDEO VAULT...</div>
        ) : videos.length === 0 ? (
          <div className={styles.centerText}>NO VIDEOS FOUND.</div>
        ) : (
          <div className={styles.grid}>
            {videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.iframeWrapper}>
                  <iframe 
                    src={getEmbedUrl(video.videoUrl)} 
                    title={video.name} 
                    className={styles.videoIframe}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.videoTitle}>{video.name}</h4>
                  <span className={styles.videoDate}>
                    {new Date(video.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}