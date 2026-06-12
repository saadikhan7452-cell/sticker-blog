import React, { useState, useEffect } from "react";
import styles from "./VideoGallery.module.css";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => { setVideos(data.reverse()); setLoading(false); })
        .catch(() => setLoading(false));
    } else { setLoading(false); }
  }, [API_URL]);

  const getEmbedUrl = (url) => {
    if (!url) return "";

    // YouTube ke liye
    if (url.includes("youtu")) {
      const id = url.match(/(youtu\.be\/|v=|embed\/)([^&?/]+)/)?.[2];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Google Drive ke liye (Force Preview)
    if (url.includes("drive.google.com")) {
      // ID extract karein
      const id = url.match(/[-\w]{25,}/); 
      if (id) {
        return `https://drive.google.com/file/d/${id[0]}/preview`;
      }
    }

    return url;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {loading ? <div className={styles.centerText}>LOADING VIDEO VAULT...</div> :
         videos.length === 0 ? <div className={styles.centerText}>NO VIDEOS FOUND.</div> : (
          <div className={styles.grid}>
            {videos.map((video) => (
              <div key={video.id} className={styles.videoCard}>
                <div className={styles.iframeWrapper}>
                  <iframe src={getEmbedUrl(video.videoUrl)} className={styles.videoIframe} allowFullScreen />
                </div>
                <div className={styles.cardBody}>
                  <h4>{video.name || "Sticker Memory"}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}