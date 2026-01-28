import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css"; 
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

export default function BloodBankDashboard() {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState({
    userName: "Loading...",
    bloodGroup: "--",
    totalDonations: 0,
    lastDonation: null
  });

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error("No token found, redirecting to login");
          navigate('/login');
          return;
        }
        
        console.log("Fetching profile data...");
        
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        
        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Dashboard data received:", data);

        if (response.ok) {
          setUserData({
            userName: data.userName || "User",
            bloodGroup: data.bloodGroup || "N/A",
            totalDonations: data.totalDonations || 0,
            lastDonation: data.lastDonation || null
          });
          console.log("User data set successfully:", {
            userName: data.userName,
            bloodGroup: data.bloodGroup,
            totalDonations: data.totalDonations
          });
        } else {
          console.error("Response not OK:", data);
          setError(data.message || "Failed to fetch profile data");
          
          // If unauthorized, redirect to login
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Unable to connect to server. Please try again later.");
        setUserData({ 
          userName: "User", 
          bloodGroup: "N/A", 
          totalDonations: 0,
          lastDonation: null 
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardInfo();
  }, [navigate]);

  return (
    <div className="main-container">
      <Navbar />
      <div className="dashboard-wrapper">
        
        {/* Hero Section: The White Box */}
        <header className="dashboard-hero">
          <div className="welcome-text">
            <span>WELCOME BACK,</span>
            <h1>
              {isLoading ? "Loading..." : userData.userName}
            </h1>
            {error && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
                {error}
              </p>
            )}
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-value">
                {isLoading ? "--" : userData.bloodGroup}
              </span>
              <span className="stat-label">Blood Type</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {isLoading ? "..." : userData.totalDonations}
              </span>
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
            <div 
              className="card-item" 
              onClick={() => navigate('/donate-blood')} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">❤️</div>
              <div className="card-content">
                <h3>Become a Donor</h3>
                <p>Register now to save lives</p>
              </div>
            </div>

            <div 
              className="card-item" 
              onClick={() => navigate('/view-events')} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">📍</div>
              <div className="card-content">
                <h3>Donation Camps</h3>
                <p>Find events near you</p>
              </div>
            </div>

            <div 
              className="card-item" 
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">🚑</div>
              <div className="card-content">
                <h3>Request Ambulance</h3>
                <p>Emergency transport services</p>
              </div>
            </div>

            <div 
              className="card-item" 
              onClick={() => navigate('/history')} 
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon-box">📜</div>
              <div className="card-content">
                <h3>History</h3>
                <p>View your past activity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Optional: Last Donation Info */}
        {userData.lastDonation && (
          <section className="dashboard-section">
            <div className="section-header">
              <div className="section-title">Last Donation</div>
            </div>
            <div className="card-item">
              <div className="card-content">
                <p>Your last donation was on: <strong>{userData.lastDonation}</strong></p>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}