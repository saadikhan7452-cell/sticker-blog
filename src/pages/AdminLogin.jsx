import React, { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Video wala email aur password logic
    if (email === "admin@stickerblog.com" && password === "infinitymedia@2026") {
      // 1. Chabi (Token) save karein
      localStorage.setItem("adminToken", "true"); 
      
      // 2. Dashboard par bhein
      window.location.href = "/admin-dashboard"; 
    } else {
      setError("❌ Invalid Email or Password!");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Admin Portal</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            name="email"  // 👈 Zaroori tag add kiya
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
          <input 
            type="password" 
            name="password" // 👈 Zaroori tag add kiya
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
          <button type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#7c3aed', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Login
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '15px', fontWeight: 'bold' }}>{error}</p>}
      </div>
    </div>
  );
}