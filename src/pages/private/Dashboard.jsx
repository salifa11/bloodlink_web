import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css"; 
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

export default function BloodBankDashboard() {
  const navigate = useNavigate();

  // 1. Initial state with placeholders
  const [userData, setUserData] = useState({
    userName: "Loading...",
    bloodGroup: "--",
    totalDonations: 0
  });

  // 2. Fetch profile data using the /api/auth path
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // FIXED URL: Matches app.use("/api/auth", authRouter) in index.js
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        // Correct path returns JSON, preventing the "<" SyntaxError
        const data = await response.json();

        if (response.ok) {
          setUserData({
            // Matches 'userName' from your SQL logs
            userName: data.userName || "User",
            // Matches camelCase aliases from your SELECT query
            bloodGroup: data.bloodgroup || "N/A", 
            totalDonations: data.totaldonations || 0 
          });
        } else {
          setUserData({ userName: "User", bloodGroup: "N/A", totalDonations: 0 });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setUserData({ userName: "User", bloodGroup: "N/A", totalDonations: 0 });
      }
    };
    fetchDashboardInfo();
  }, []);

  return (
    <div className="main-container">
      <Navbar />
      <div className="dashboard-wrapper">
        
        {/* Hero Section: The White Box */}
        <header className="dashboard-hero">
          <div className="welcome-text">
            <span>WELCOME BACK,</span>
            {/* Displays real name like "Salifa Shrestha" */}
            <h1>{userData.userName}</h1>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              {/* Displays real Blood Type */}
              <span className="stat-value">{userData.bloodGroup}</span>
              <span className="stat-label">Blood Type</span>
            </div>
            <div className="stat-card">
              {/* Displays actual Donation Count */}
              <span className="stat-value">{userData.totalDonations}</span>
              <span className="stat-label">Donations</span>
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-header">
             <div className="section-title">Quick Actions</div>
          </div>
          <div className="quick-action-grid">
            <div 
              className="card-item quick-action-card" 
              onClick={() => navigate('/blood-banks')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">🔍</div>
              <div className="card-content">
                <h3>Find Donors</h3>
                <p>Search by blood type & area</p>
              </div>
            </div>
            
            <div 
              className="card-item quick-action-card"
              onClick={() => navigate('/blood-banks')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">🏛️</div>
              <div className="card-content">
                <h3>Blood Banks</h3>
                <p>Locate nearby storage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="dashboard-section">
          <div className="section-header">
             <div className="section-title">Services</div>
          </div>
          <div className="action-grid">
            <div className="card-item" onClick={() => navigate('/donate-blood')} style={{ cursor: 'pointer' }}>
              <div className="card-icon-box">❤️</div>
              <div className="card-content">
                <h3>Become a Donor</h3>
                <p>Register now to save lives</p>
              </div>
            </div>

            <div className="card-item" onClick={() => navigate('/view-events')} style={{ cursor: 'pointer' }}>
              <div className="card-icon-box">📍</div>
              <div className="card-content">
                <h3>Donation Camps</h3>
                <p>Find events near you</p>
              </div>
            </div>

            <div className="card-item" style={{ cursor: 'pointer' }}>
              <div className="card-icon-box">🚑</div>
              <div className="card-content">
                <h3>Request Ambulance</h3>
                <p>Emergency transport services</p>
              </div>
            </div>

            <div className="card-item" onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>
              <div className="card-icon-box">📜</div>
              <div className="card-content">
                <h3>History</h3>
                <p>View your past activity</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}