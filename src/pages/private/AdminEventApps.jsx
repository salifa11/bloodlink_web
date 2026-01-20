import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "../../components/adminnavbar";
import Footer from "../../components/footer";
import "../../css/AdminEventApp.css";

const AdminEventApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApps = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return navigate("/login");
      const res = await fetch("http://localhost:5000/api/applications/all", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.status === 401) navigate("/login");
      const data = await res.json();
      setApps(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchApps(); }, [navigate]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/applications/status/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        // Update local state instantly
        setApps((prev) => prev.map((app) => app.id === id ? { ...app, status } : app));
      } else {
        const data = await res.json();
        alert(`Error: ${data.message}`);
      }
    } catch (err) { alert("Network error. Check backend."); }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="admin-dashboard-wrapper">
      <AdminNavbar />
      <main className="admin-main-content">
        <div className="admin-system-card">
          <h1 className="admin-main-title">Event Applications</h1>
          <div className="total-stat-box">
             <span className="stat-label">TOTAL APPLICATIONS</span>
             <span className="stat-number">{apps.length}</span>
          </div>
        </div>
        <div className="admin-table-container">
          <table className="management-table">
            <thead>
              <tr>
                <th>APPLICANT</th><th>EVENT</th><th>ROLE</th><th>STATUS</th><th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id}>
                  <td>{app.user?.userName || "N/A"}</td>
                  <td>{app.event?.eventName || "N/A"}</td>
                  <td>{app.applicationType}</td>
                  <td><span className={`status-tag-${app.status}`}>{app.status}</span></td>
                  <td>
                    {app.status === 'pending' ? (
                      <div className="action-btns">
                        <button className="btn-tick" onClick={() => handleStatusUpdate(app.id, 'approved')}>✔</button>
                        <button className="btn-cross" onClick={() => handleStatusUpdate(app.id, 'rejected')}>✖</button>
                      </div>
                    ) : ( <span className="action-done">Completed</span> )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEventApps;