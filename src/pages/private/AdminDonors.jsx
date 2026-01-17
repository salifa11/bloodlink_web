import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';
import "../../css/AdminDonors.css";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/donor/admin/all", {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setDonors(data);
      } catch (err) {
        console.error("Error fetching donors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  if (loading) return <div className="loader">Loading Donor Data...</div>;

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNavbar />
      
      <main className="admin-main-content">
        {/* Compact Themed Management Card */}
        <div className="admin-management-card">
          <div className="card-header-flex">
            <div className="title-section">
              <h1 className="admin-card-title">Donor Management System</h1>
              <p className="admin-card-subtitle">View and manage all blood donor registrations</p>
            </div>
            
            {/* Red Stat Box */}
            <div className="red-stat-box">
              <span className="stat-label">TOTAL REGISTERED DONORS</span>
              <span className="stat-number">{donors.length}</span>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="admin-table-card">
          <table className="management-table">
            <thead>
              <tr>
                <th>FULL NAME</th>
                <th>PREFERRED HOSPITAL</th>
                <th>BLOOD GROUP</th>
                <th>LOCATION</th>
                <th>CONTACT</th>
                <th>AGE</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td className="font-bold">N/A</td>
                  <td className="hospital-name">{donor.hospital}</td>
                  <td><span className="blood-badge">{donor.bloodGroup}</span></td>
                  <td>{donor.city}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {donors.length === 0 && (
            <div className="no-data-msg">No donor registrations found.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDonors;