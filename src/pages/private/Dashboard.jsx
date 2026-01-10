import React, { useState } from "react";
import "../../css/dashboard.css"; 
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";

export default function BloodBankDashboard() {
  const [userName] = useState("Salifa Shrestha");
  const [userBloodType] = useState("O+");
  const [donationCount] = useState(2);

  return (
    <div className="main-container">
      <Navbar />
      <div className="dashboard-wrapper">
        {/* Hero Section */}
        <header className="dashboard-hero">
          <div className="welcome-text">
            <span>Welcome back,</span>
            <h1>{userName}</h1>
          </div>
          
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-value">{userBloodType}</span>
              <span className="stat-label">Blood Type</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{donationCount}</span>
              <span className="stat-label">Donations</span>
            </div>
          </div>
        </header>

        {/* Quick Actions - Uses separate grid class to handle width better */}
        <section>
          <div className="section-header">
             <div className="section-title">Quick Actions</div>
          </div>
          <div className="quick-action-grid">
            <div className="card-item quick-action-card">
              <div className="card-icon-box">🔍</div>
              <div className="card-content">
                <h3>Find Donors</h3>
                <p>Search by blood type & area</p>
              </div>
            </div>
            
            <div className="card-item quick-action-card">
              <div className="card-icon-box">🏛️</div>
              <div className="card-content">
                <h3>Blood Banks</h3>
                <p>Locate nearby storage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section>
          <div className="section-header">
             <div className="section-title">Services</div>
          </div>
          <div className="action-grid">
            <div className="card-item">
              <div className="card-icon-box">❤️</div>
              <div className="card-content">
                <h3>Become a Donor</h3>
                <p>Register now to save lives</p>
              </div>
            </div>

            <div className="card-item">
              <div className="card-icon-box">📍</div>
              <div className="card-content">
                <h3>Donation Camps</h3>
                <p>Find events near you</p>
              </div>
            </div>

            <div className="card-item">
              <div className="card-icon-box">🚑</div>
              <div className="card-content">
                <h3>Request Ambulance</h3>
                <p>Emergency transport services</p>
              </div>
            </div>

            <div className="card-item">
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