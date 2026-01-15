import React, { useEffect, useState } from 'react';
import { getAllDonors } from "../../../utils/api";
import "../../css/AdminDashboard.css"; 
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No admin token found");
        
        const data = await getAllDonors(token);
        setDonors(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="admin-loader">Loading Admin Panel...</div>;

  return (
    <div className="admin-page-wrapper">
      <AdminNavbar />
      
      <main className="admin-main-content">
        <header className="admin-topbar">
          <div className="header-text">
            <h1>Admin Management System</h1>
            <p>View and manage all user registrations</p>
          </div>
          <div className="admin-stats-card">
            <span className="stats-label">Total Registered Users</span>
            <span className="stats-number">{donors.length}</span>
          </div>
        </header>

        <section className="admin-content">
          {error ? (
            <div className="admin-error-card">{error}</div>
          ) : (
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Blood Group</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.length > 0 ? (
                    donors.map((person) => (
                      <tr key={person.id}>
                        <td className="font-bold">{person.userName || 'N/A'}</td>
                        <td>{person.userEmail}</td>
                        <td>
                          <span className="blood-badge">
                            {person.bloodGroup || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span className={`role-badge ${person.role}`}>
                            {person.role}
                          </span>
                        </td>
                        <td>{person.location || 'N/A'}</td>
                        <td>{person.phone || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;