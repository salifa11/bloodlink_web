import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';
import "../../css/AdminDonors.css";

const AdminDonors = () => {
  const [donors, setDonors] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5000/api/donor/admin/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setDonors(data); 
      } else {
        setDonors([]);
      }
    } catch (err) { 
      setDonors([]); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/donor/status/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setDonors((prev) => prev.map((d) => d.id === id ? { ...d, status: newStatus } : d));
      } else {
        const errorData = await res.json();
        alert(`Update failed: ${errorData.message}`);
      }
    } catch (err) { 
      alert("Status update failed. Check backend connection."); 
    }
  };

  useEffect(() => { fetchDonors(); }, []);

  if (loading) return <div className="loader">Loading Donor Data...</div>;

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNavbar />
      <main className="admin-main-content">
        {/* Management Card with Flex Layout */}
        <div className="admin-management-card">
          <div className="card-header-flex">
            <div className="title-section">
              <h1 className="admin-card-title">Donor Management System</h1>
              <p className="admin-card-subtitle">View and manage all blood donor registrations</p>
            </div>
            
            {/* This box is pushed to the right by card-header-flex */}
            <div className="red-stat-box">
              <span className="stat-label">TOTAL REGISTERED DONORS</span>
              <span className="stat-number">{donors.length}</span>
            </div>
          </div>
        </div>

        <div className="admin-table-card">
          <table className="management-table">
            <thead>
              <tr>
                <th>FULL NAME</th>
                <th>PREFERRED HOSPITAL</th>
                <th>BLOOD GROUP</th>
                <th>STATUS</th>
                <th>CONTACT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? (
                donors.map((donor) => (
                  <tr key={donor.id}>
                    <td className="font-bold">{donor.user?.userName || "N/A"}</td>
                    <td>{donor.hospital || "N/A"}</td>
                    <td><span className="blood-badge">{donor.bloodGroup}</span></td>
                    <td>
                      <span className={`status-badge ${donor.status}`}>
                        {donor.status}
                      </span>
                    </td>
                    <td>{donor.phone}</td>
                    <td>
                      <div className="action-btns-flex">
                        <button 
                          className="btn-toggle btn-available"
                          onClick={() => handleStatusToggle(donor.id, 'available')}
                          disabled={donor.status === 'available'}
                        >Available</button>
                        <button 
                          className="btn-toggle btn-unavailable"
                          onClick={() => handleStatusToggle(donor.id, 'unavailable')}
                          disabled={donor.status === 'unavailable'}
                        >Unavailable</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data-msg">No donor registrations found.</td>
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

export default AdminDonors;