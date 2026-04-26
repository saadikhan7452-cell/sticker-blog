import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clapperboard, Info, Upload, Menu, X, Lock, LogOut } from 'lucide-react'; // Added LogOut icon
import styles from './Navbar.module.css'; 
import myLogo from '../assets/logo.jpeg'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Check if admin is logged in (Optional styling ke liye)
  const isAdmin = localStorage.getItem('adminToken');

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/'; // Reload to home page to properly clear out the Navbar state
  };

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
          
          {/* Conditional Admin Links */}
          {isAdmin ? (
            <>
              <Link to="/admin-dashboard" className={styles.link} title="Admin Dashboard"><Lock size={16}/></Link>
              <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Logout"><LogOut size={16}/></button>
            </>
          ) : (
            <Link to="/admin-login" className={styles.link} title="Sign In / Sign Up"><Lock size={16}/></Link>
          )}
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
        
        {isAdmin ? (
          <>
            <Link to="/admin-dashboard" className={styles.sideLink} onClick={toggleMenu}><Lock size={20}/> Dashboard</Link>
            <button onClick={handleLogout} className={styles.sideLink} style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}><LogOut size={20}/> Logout</button>
          </>
        ) : (
          <Link to="/admin-login" className={styles.sideLink} onClick={toggleMenu}>
            <Lock size={20}/> Sign In / Sign Up
          </Link>
        )}
      </div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </nav>
  );
}