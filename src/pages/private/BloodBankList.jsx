import React, { useEffect, useState } from 'react';
import Navbar from '../../components/insidenavbar';
import Footer from '../../components/footer';
import "../../css/AdminDonors.css";

const BloodBankList = () => {
  const [availableDonors, setAvailableDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [loading, setLoading] = useState(true);

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

  // 1. Filter logic: checks bloodGroup and hospital names
const filteredDonors = availableDonors.filter((donor) => {
  const search = searchTerm.toLowerCase();

  // Add (donor.field || "") to handle null values safely
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
            
            {/* 2. Added Search Input Field */}
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data-msg">No matching donors found.</td>
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