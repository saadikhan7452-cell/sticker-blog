import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react'; // Ek chota icon visual appeal ke liye
import styles from './BlogCard.module.css';

export default function BlogCard({ blog }) {
  // YouTube Thumbnail ka direct link
  const thumbnailUrl = `https://img.youtube.com/vi/${blog.youtubeId}/maxresdefault.jpg`;

  return (
    <Link to={`/blog/${blog.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* Direct YouTube Thumbnail yahan load hoga */}
          <img 
            src={thumbnailUrl} 
            alt={blog.title} 
            className={styles.image} 
            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${blog.youtubeId}/hqdefault.jpg`; }}
          />
          <div className={styles.playOverlay}>
            <PlayCircle size={40} color="white" />
          </div>
          <span className={styles.categoryTag}>{blog.category}</span>
        </div>
        
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.date}>{blog.date}</span>
          </div>
          <h3 className={styles.title}>{blog.title}</h3>
          <p className={styles.excerpt}>{blog.excerpt}</p>
          <span className={styles.readMore}>Read Story →</span>
        </div>
      </div>
    </Link>
  );
}