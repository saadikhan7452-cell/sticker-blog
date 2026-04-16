import { useParams, Link } from 'react-router-dom';
import { dummyBlogs } from '../data/dummyData';
// 1. Yahan Youtube ki jagah PlayCircle import kiya hai 👇
import { PlayCircle, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import styles from './SingleBlog.module.css';

export default function SingleBlog() {
  const { id } = useParams();
  const blog = dummyBlogs.find(b => b.id === id);

  if (!blog) return <div className={styles.error}>Blog post not found!</div>;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        
        {/* MAIN CONTENT AREA */}
        <main className={styles.mainContent}>
          <Link to="/blogs" className={styles.backBtn}><ArrowLeft size={18}/> Back to Blogs</Link>
          
          <h1 className={styles.title}>{blog.title}</h1>
          
          <div className={styles.meta}>
            <span><User size={16}/> {blog.author}</span>
            <span><Calendar size={16}/> {blog.date}</span>
            <span 
              onClick={handleShare} 
              style={{ cursor: 'pointer', color: 'var(--brand-purple)', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Share2 size={16}/> Share
            </span>
          </div>

          {/* Video Player Section */}
          <div className={styles.videoContainer}>
            <iframe 
              src={`https://www.youtube.com/embed/${blog.youtubeId}`} 
              title="YouTube video player" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Article Text */}
         <div className={styles.articleBody}>
  <p className={styles.intro}>{blog.excerpt}</p>
  {/* Yahan humne HTML render karne ka code lagaya hai */}
  <div className={styles.text} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
</div>
        </main>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.widget}>
            <h3>About StickerStories1</h3>
            <p>Welcome to the ultimate home for sticker collectors. We share weekly hauls and tutorials.</p>
            <a href="https://www.youtube.com/@StickerStories1?sub_confirmation=1" target="_blank" rel="noreferrer" className={styles.sidebarCta}>
              {/* 2. Yahan bhi PlayCircle laga diya hai 👇 */}
              <PlayCircle size={18}/> Subscribe
            </a>
          </div>

          <div className={styles.widget}>
            <h3>Categories</h3>
            <ul className={styles.catList}>
              <li>Hauls</li>
              <li>Tutorials</li>
              <li>Reviews</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}    