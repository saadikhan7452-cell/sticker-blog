import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Video, Play, User, Mail, Calendar, ExternalLink, Download, LayoutDashboard } from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Auth Check (Local Storage check)
    if (!localStorage.getItem('isAdmin')) {
      window.location.href = '/admin-login';
      return;
    }

    const fetchVideos = async () => {
      try {
        const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        const res = await axios.get(SCRIPT_URL);
        // Sorting: Newest videos first
        const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setVideos(sortedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to fetch data from Google Drive.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <LayoutDashboard size={24} color="#fbbf24" />
          </div>
          <div>
            <h2 className={styles.title}>StickerStory <span className={styles.highlight}>Admin</span></h2>
            <p className={styles.subtitle}>Review and manage high-quality submissions.</p>
          </div>
        </div>
        <div className={styles.statsBadge}>
          <Video size={18} />
          <span>{videos.length} Total Submissions</span>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Loading & Error States */}
      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p>Syncing with Google Drive...</p>
        </div>
      )}
      
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div className={styles.emptyState}>
          <Video size={60} color="#334155" />
          <h3>No stories found</h3>
          <p>Fresh submissions from users will appear here automatically.</p>
        </div>
      )}

      {/* Video Grid */}
      <div className={styles.grid}>
        {videos.map(video => (
          <div key={video._id} className={styles.card}>
            
            {/* Direct Video Player Area */}
            <div className={styles.videoPreview}>
              <iframe
                src={video.videoUrl}
                className={styles.iframePlayer}
                allow="autoplay"
                frameBorder="0"
                title={video.name}
              ></iframe>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.userSection}>
                <div className={styles.avatar}>{video.name ? video.name[0].toUpperCase() : 'A'}</div>
                <div className={styles.userDetails}>
                  <h4 className={styles.userName}><User size={14} /> {video.name || "Anonymous"}</h4>
                  <p className={styles.userEmail}><Mail size={12} /> {video.email || "No Email"}</p>
                </div>
              </div>

              <div className={styles.dateInfo}>
                 <Calendar size={14} /> {new Date(video.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>

              <div className={styles.buttonGroup}>
                {/* Watch Full Link */}
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                  Preview <ExternalLink size={14} />
                </a>
                
                {/* HD Download Button (Fixes the client's need) */}
                <a href={video.downloadUrl || video.videoUrl.replace('preview', 'view')} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className={styles.downloadBtn}>
                  Download HD <Download size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}