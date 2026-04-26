import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css"; 

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Security Check
    const auth = localStorage.getItem('isAuthenticated');
    if (auth !== 'true') {
      window.location.href = '/login';
    }

    // Fetch Data
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/data');
        setSubmissions(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.adminContainer}>
      <h1>Client Dashboard</h1>
      <div className={styles.tableCard}>
        <table>
          <thead>
            <tr>
              <th>User Details</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((item) => (
                <tr key={item._id}>
                  <td className={styles.userInfo}>
                    <strong>{item.name}</strong>
                    <span>{item.email}</span>
                  </td>
                  <td><span className={styles.countryTag}>{item.country}</span></td>
                  <td>
                    <a href={item.videoUrl} target="_blank" rel="noreferrer" className={styles.viewBtn}>
                      Watch Video
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className={styles.noData}>No submissions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}