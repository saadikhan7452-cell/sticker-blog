import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Video, Play, User, Mail, Calendar, ExternalLink } from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Agar admin logged in nahi hai, toh login page par bhej do
    if (!localStorage.getItem('adminToken')) {
      window.location.href = '/admin-login';
      return;
    }

    // 2. Live backend ya localhost se videos fetch karo
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    axios.get(`${API_URL}/api/admin/all-videos`)
      .then(res => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('❌ Backend se connect nahi ho paa raha. Make sure "node server.js" chal raha hai.');
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Admin Hub</h2>
          <p className={styles.subtitle}>Manage and review user submitted sticker stories.</p>
        </div>
        <div className={styles.statsBadge}>
          <Video size={20} />
          {videos.length} Total Submissions
        </div>
      </div>

      {loading && <p style={{textAlign: 'center', fontSize: '1.2rem'}}>Loading database...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

      {!loading && !error && videos.length === 0 && (
        <div style={{ padding: '30px', background: '#f3f4f6', borderRadius: '15px', textAlign: 'center' }}>
          <Video size={48} color="#9ca3af" style={{ margin: '0 auto 15px auto' }}/>
          <h3 style={{color: '#4b5563'}}>No submissions yet</h3>
          <p style={{color: '#6b7280'}}>When users upload videos, they will appear here.</p>
        </div>
      )}

      <div className={styles.grid}>
        {videos.map(video => (
          <div key={video._id} className={styles.card}>
            
            {/* Fake Video Thumbnail (Redirects to actual video on click) */}
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.cardThumb}>
               <div className={styles.playBtn}><Play fill="currentColor" size={24} /></div>
            </a>

            <div className={styles.cardBody}>
              <div className={`${styles.userInfo} ${styles.userName}`}>
                <User size={18} color="#7c3aed"/> {video.name || "Anonymous Creator"}
              </div>
              <div className={styles.userInfo}>
                <Mail size={16}/> {video.email || "No Email Provided"}
              </div>
              <div className={styles.userInfo}>
                <Calendar size={16}/> {new Date(video.createdAt).toLocaleDateString()}
              </div>

              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.watchBtn}>
                Open Video Link <ExternalLink size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}