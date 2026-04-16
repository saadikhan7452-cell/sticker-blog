import BlogCard from '../components/BlogCard';
import { dummyBlogs } from '../data/dummyData';
import styles from './Blogs.module.css';

export default function Blogs() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>Sticker <span className={styles.highlight}>Blogs</span></h1>
          <p className={styles.subtitle}>
            Explore our latest sticker hauls, in-depth tutorials, and honest reviews.
          </p>
        </header>
        
        <div className={styles.grid}>
          {dummyBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </div>
  );
}