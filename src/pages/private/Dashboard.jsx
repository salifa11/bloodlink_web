import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css";
import Footer from "../../components/footer";
import Navbar from "../../components/insidenavbar";
import AmbulanceHospitals from "../../components/AmbulanceHospitals";

export default function BloodBankDashboard() {
  const navigate = useNavigate();
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);

  const [userData, setUserData] = useState({
    userName: "Loading...",
    bloodGroup: "--",
    totalDonations: 0,
    lastDonation: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDashboardInfo = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("http://localhost:5000/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setUserData({
            userName: data.userName || "User",
            bloodGroup: data.bloodGroup || "N/A",
            totalDonations: data.totalDonations || 0,
            lastDonation: data.lastDonation || null
          });
        } else {
          setError(data.message || "Failed to fetch profile data");
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      } catch (err) {
        setError("Unable to connect to server. Please try again later.");
        setUserData({ userName: "User", bloodGroup: "N/A", totalDonations: 0, lastDonation: null });
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserHistory = async () => {
      try {
        setHistoryLoading(true);
        const response = await fetch("http://localhost:5000/api/applications/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setHistory(data.history || []);
        } else {
          setHistoryError(data.message || "Failed to fetch history");
        }
      } catch (err) {
        setHistoryError("Unable to load history.");
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchDashboardInfo();
    fetchUserHistory();
  }, [navigate]);

  const getStatusBadge = (status) => {
    const config = {
      pending: { class: "badge-pending", label: "Pending" },
      approved: { class: "badge-approved", label: "Approved" },
      rejected: { class: "badge-rejected", label: "Rejected" }
    };
    return config[status] || { class: "badge-pending", label: status };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getTypeIcon = (type) => {
    const icons = {
      donor: "🩸",
      volunteer: "👥",
      "first-aid": "🏥",
      staff: "👨‍⚕️"
    };
    return icons[type?.toLowerCase()] || "📋";
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="dashboard-wrapper">

        {/* Hero Section */}
        <header className="dashboard-hero">
          <div className="welcome-text">
            <span>WELCOME BACK,</span>
            <h1>{isLoading ? "Loading..." : userData.userName}</h1>
            {error && <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
          </div>
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-value">{isLoading ? "--" : userData.bloodGroup}</span>
              <span className="stat-label">Blood Type</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{isLoading ? "..." : userData.totalDonations}</span>
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
            <div className="card-item quick-action-card" onClick={() => navigate("/blood-banks")} style={{ cursor: "pointer" }}>
              <div className="card-icon-box">🔍</div>
              <div className="card-content">
                <h3>Find Donors</h3>
                <p>Search by blood type & area</p>
              </div>
            </div>
            <div className="card-item quick-action-card" onClick={() => navigate("/blood-banks")} style={{ cursor: "pointer" }}>
              <div className="card-icon-box">🏛️</div>
              <div className="card-content">
                <h3>Blood Banks</h3>
                <p>Locate nearby storage</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="dashboard-section">
          <div className="section-header">
            <div className="section-title">Services</div>
          </div>
          <div className="action-grid">
            <div className="card-item" onClick={() => navigate("/donate-blood")} style={{ cursor: "pointer" }}>
              <div className="card-icon-box">❤️</div>
              <div className="card-content">
                <h3>Become a Donor</h3>
                <p>Register now to save lives</p>
              </div>
            </div>
            <div className="card-item" onClick={() => navigate("/view-events")} style={{ cursor: "pointer" }}>
              <div className="card-icon-box">📍</div>
              <div className="card-content">
                <h3>Donation Camps</h3>
                <p>Find events near you</p>
              </div>
            </div>
            <div className="card-item" onClick={() => setShowAmbulanceModal(true)} style={{ cursor: "pointer" }}>
              <div className="card-icon-box">🚑</div>
              <div className="card-content">
                <h3>Request Ambulance</h3>
                <p>Emergency transport services</p>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <div className="section-title">📜 Application History</div>
          </div>

          {historyLoading ? (
            <div className="card-item" style={{ justifyContent: "center", padding: "2rem" }}>
              <p>Loading history...</p>
            </div>
          ) : historyError ? (
            <div className="card-item" style={{ padding: "1.5rem" }}>
              <p style={{ color: "red" }}>⚠️ {historyError}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="card-item" style={{ flexDirection: "column", alignItems: "center", padding: "2rem", gap: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>📭</span>
              <p>You haven't applied to any events yet.</p>
              <button
                onClick={() => navigate("/view-events")}
                style={{ padding: "0.5rem 1.5rem", cursor: "pointer", borderRadius: "8px", border: "none", background: "#e03957", color: "white" }}
              >
                → View Events
              </button>
            </div>
          ) : (
            <>
              {/* Stats Row */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {[
                  { label: "Total", value: history.length },
                  { label: "Approved", value: history.filter(h => h.status === "approved").length },
                  { label: "Pending", value: history.filter(h => h.status === "pending").length },
                  { label: "Rejected", value: history.filter(h => h.status === "rejected").length }
                ].map(stat => (
                  <div key={stat.label} className="stat-card">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* History Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {history.map((application, index) => (
                  <div key={application.id || index} className="card-item" style={{ alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ fontSize: "2rem" }}>{getTypeIcon(application.applicationType)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                        <h3 style={{ margin: 0 }}>{application.event?.eventName || "Event"}</h3>
                        <span
                          style={{
                            padding: "0.2rem 0.7rem",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            background:
                              application.status === "approved" ? "#d4edda" :
                              application.status === "rejected" ? "#f8d7da" : "#fff3cd",
                            color:
                              application.status === "approved" ? "#155724" :
                              application.status === "rejected" ? "#721c24" : "#856404"
                          }}
                        >
                          {getStatusBadge(application.status).label}
                        </span>
                      </div>
                      <p style={{ margin: "0.2rem 0", fontSize: "0.85rem", color: "#666" }}>
                        <strong>Type:</strong> {application.applicationType || "N/A"} &nbsp;|&nbsp;
                        <strong>Location:</strong> {application.event?.location || "N/A"}
                      </p>
                      <p style={{ margin: "0.2rem 0", fontSize: "0.85rem", color: "#666" }}>
                        <strong>Event Date:</strong> {formatDate(application.event?.eventDate)} &nbsp;|&nbsp;
                        <strong>Applied:</strong> {formatDate(application.createdAt)}
                      </p>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#aaa", whiteSpace: "nowrap" }}>#{application.id}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Last Donation */}
        {userData.lastDonation && (
          <section className="dashboard-section">
            <div className="section-header">
              <div className="section-title">Last Donation</div>
            </div>
            <div className="card-item">
              <div className="card-content">
                <p>Your last donation was on: <strong>{new Date(userData.lastDonation).toLocaleDateString()}</strong></p>
              </div>
            </div>
          </section>
        )}

      </div>
      <AmbulanceHospitals isOpen={showAmbulanceModal} onClose={() => setShowAmbulanceModal(false)} />
      <Footer />
    </div>
  );
}