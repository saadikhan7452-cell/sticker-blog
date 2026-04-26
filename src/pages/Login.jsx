import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { 
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin-dashboard');
    } else {
      alert('Invalid Password!');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginCard} onSubmit={handleLogin}>
        <h2>Login / Sign Up</h2>
        <p>Access your dashboard with your secret key.</p>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.loginInput}
          required
        />
        <button type="submit" className={styles.loginBtn}>Continue</button>
      </form>
    </div>
  );
}