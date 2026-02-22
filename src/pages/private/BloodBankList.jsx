import React, { useEffect, useState } from 'react';
import Navbar from '../../components/insidenavbar';
import Footer from '../../components/footer';
import "../../css/AdminDonors.css";

const BloodBankList = () => {
  const [availableDonors, setAvailableDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [notifyStatus, setNotifyStatus] = useState({}); // tracks each donor's notify state

  const fetchAvailable = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/donor/available", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setAvailableDonors(data);
      } else {
        setAvailableDonors([]);
      }
    } catch (err) {
      setAvailableDonors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailable();
  }, []);

  const handleNotify = async (donor) => {
    const donorUserId = donor.userId || donor.user?.id;

    if (!donorUserId) {
      setNotifyStatus(prev => ({ ...prev, [donor.id]: "error" }));
      return;
    }

    setNotifyStatus(prev => ({ ...prev, [donor.id]: "loading" }));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5000/api/notifications/notify-donor", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          donorUserId,
          bloodGroup: donor.bloodGroup,
          location: donor.city
        })
      });

      if (res.ok) {
        setNotifyStatus(prev => ({ ...prev, [donor.id]: "sent" }));
        // Reset button after 3 seconds
        setTimeout(() => {
          setNotifyStatus(prev => ({ ...prev, [donor.id]: null }));
        }, 3000);
      } else {
        setNotifyStatus(prev => ({ ...prev, [donor.id]: "error" }));
      }
    } catch (err) {
      setNotifyStatus(prev => ({ ...prev, [donor.id]: "error" }));
    }
  };

  const getButtonStyle = (status) => {
    const base = {
      padding: "0.35rem 0.9rem",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.8rem",
      fontWeight: "600",
      transition: "all 0.2s"
    };
    if (status === "sent") return { ...base, background: "#d4edda", color: "#155724", cursor: "default" };
    if (status === "loading") return { ...base, background: "#fff3cd", color: "#856404", cursor: "wait" };
    if (status === "error") return { ...base, background: "#f8d7da", color: "#721c24" };
    return { ...base, background: "#e03957", color: "white" };
  };

  const getButtonLabel = (status) => {
    if (status === "sent") return "✓ Notified";
    if (status === "loading") return "Sending...";
    if (status === "error") return "Failed";
    return "🔔 Notify";
  };

  const filteredDonors = availableDonors.filter((donor) => {
    const search = searchTerm.toLowerCase();
    return (
      (donor.bloodGroup || "").toLowerCase().includes(search) ||
      (donor.hospital || "").toLowerCase().includes(search) ||
      (donor.city || "").toLowerCase().includes(search) ||
      (donor.user?.userName || "").toLowerCase().includes(search)
    );
  });

  if (loading) return <div className="loader">Searching for donors...</div>;

  return (
    <div className="admin-dashboard-wrapper">
      <Navbar />
      <main className="admin-main-content" style={{ paddingTop: '100px' }}>
        <div className="admin-management-card">
          <div className="card-header-flex">
            <div className="title-section">
              <h1 className="admin-card-title">Nearby Available Donors</h1>
              <p className="admin-card-subtitle">Connect with donors ready to help right now</p>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Blood Group (e.g., B+)..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="red-stat-box">
              <span className="stat-label">RESULTS FOUND</span>
              <span className="stat-number">{filteredDonors.length}</span>
            </div>
          </div>
        </div>

        <div className="admin-table-card">
          <table className="management-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>HOSPITAL</th>
                <th>BLOOD GROUP</th>
                <th>LOCATION</th>
                <th>CONTACT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.length > 0 ? (
                filteredDonors.map((donor) => (
                  <tr key={donor.id}>
                    <td className="font-bold">{donor.user?.userName || "N/A"}</td>
                    <td>{donor.hospital || "N/A"}</td>
                    <td><span className="blood-badge">{donor.bloodGroup}</span></td>
                    <td>{donor.city}</td>
                    <td>{donor.phone}</td>
                    <td>
                      <button
                        style={getButtonStyle(notifyStatus[donor.id])}
                        onClick={() => handleNotify(donor)}
                        disabled={notifyStatus[donor.id] === "loading" || notifyStatus[donor.id] === "sent"}
                      >
                        {getButtonLabel(notifyStatus[donor.id])}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data-msg">No matching donors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BloodBankList;