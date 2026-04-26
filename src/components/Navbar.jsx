import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clapperboard, Info, Upload, Menu, X, Lock } from 'lucide-react';
import styles from './Navbar.module.css'; 
import myLogo from '../assets/logo.jpeg'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check karna ke admin logged in hai ya nahi (optional check)
  const isAdmin = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.logo}>
          <img 
            src={myLogo} 
            alt="StickerBlog Logo" 
            style={{ height: '60px', width: 'auto', borderRadius: '8px' }} 
          />
          <span className={styles.logoText}>StickerBlog</span>
        </Link>
        
        {/* Desktop Links */}
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}><BookOpen size={18}/> Home</Link>
          <Link to="/blogs" className={styles.link}><Clapperboard size={18}/> Watch & Read</Link>
          <Link to="/submit" className={styles.link}><Upload size={18}/> Submit Video</Link>
          <Link to="/about" className={styles.link}><Info size={18}/> About</Link>
          
          {/* Admin Link - Sirf tab dikhega jab login ho, ya aap hamesha ke liye bhi rakh sakte hain */}
        <Link to="/login" className={styles.adminLink}>
  <Lock size={18}/> Login / Sign Up
</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.menuBtn} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.active : ''}`}>
        <Link to="/" className={styles.sideLink} onClick={toggleMenu}>
          <BookOpen size={20}/> Home
        </Link>
        <Link to="/blogs" className={styles.sideLink} onClick={toggleMenu}>
          <Clapperboard size={20}/> Watch & Read
        </Link>
        <Link to="/submit" className={styles.sideLink} onClick={toggleMenu}>
          <Upload size={20}/> Submit Video
        </Link>
        <Link to="/about" className={styles.sideLink} onClick={toggleMenu}>
          <Info size={20}/> About
        </Link>
       <Link to="/login" className={styles.sideLink} onClick={toggleMenu}>
  <Lock size={20}/> Login / Sign Up
</Link>
      </div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </nav>
  );
}