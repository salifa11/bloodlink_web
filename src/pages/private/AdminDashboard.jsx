// import React, { useEffect, useState } from 'react';
// import { getAllDonors, deleteUserByAdmin } from "../../../utils/api";
// import "../../css/AdminDashboard.css"; 
// import AdminNavbar from '../../components/adminnavbar';
// import Footer from '../../components/footer';

// const AdminDashboard = () => {
//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteError, setDeleteError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error("No admin token found");
        
//         const data = await getAllDonors(token);
//         setDonors(data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDeleteUser = async (userId, userName) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${userName}? This action cannot be undone.`
//     );
    
//     if (!confirmDelete) return;

//     try {
//       setDeleteError(null);
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error("No admin token found");

//       await deleteUserByAdmin(userId, token);

//       // Remove the deleted user from the list
//       setDonors(donors.filter(donor => donor.id !== userId));
//       alert('User deleted successfully!');
//     } catch (err) {
//       const error = err.message || 'Unknown error occurred';
//       setDeleteError(error);
//       console.error("Delete error:", err);
//       alert(`Error deleting user: ${error}`);
//     }
//   };

//   if (loading) return <div className="admin-loader">Loading Admin Panel...</div>;

//   return (
//     <div className="admin-page-wrapper">
//       <AdminNavbar />
      
//       <main className="admin-main-content">
//         <header className="admin-topbar">
//           <div className="header-text">
//             <h1>Admin Management System</h1>
//             <p>View and manage all user registrations</p>
//           </div>
//           <div className="admin-stats-card">
//             <span className="stats-label">Total Registered Users</span>
//             <span className="stats-number">{donors.length}</span>
//           </div>
//         </header>

//         <section className="admin-content">
//           {error ? (
//             <div className="admin-error-card">{error}</div>
//           ) : deleteError ? (
//             <div className="admin-error-card">{deleteError}</div>
//           ) : (
//             <div className="table-container">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Full Name</th>
//                     <th>Email Address</th>
//                     <th>Blood Group</th>
//                     <th>Role</th>
//                     <th>Location</th>
//                     <th>Contact</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {donors.length > 0 ? (
//                     donors.map((person) => (
//                       <tr key={person.id}>
//                         <td className="font-bold">{person.userName || 'N/A'}</td>
//                         <td>{person.userEmail}</td>
//                         <td>
//                           <span className="blood-badge">
//                             {person.bloodGroup || 'N/A'}
//                           </span>
//                         </td>
//                         <td>
//                           <span className={`role-badge ${person.role}`}>
//                             {person.role}
//                           </span>
//                         </td>
//                         <td>{person.location || 'N/A'}</td>
//                         <td>{person.phone || 'N/A'}</td>
//                         <td>
//                           <button
//                             onClick={() => handleDeleteUser(person.id, person.userName)}
//                             className="delete-btn"
//                             title="Delete user"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" className="empty-state">No users found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import { getAllDonors, deleteUserByAdmin } from "../../../utils/api";
import "../../css/AdminDashboard.css"; 
import AdminNavbar from '../../components/adminnavbar';
import Footer from '../../components/footer';

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No admin token found");
      
      const data = await getAllDonors(token);
      setDonors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setDeleteModal({ show: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.user) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No admin token found");

      console.log(`Deleting user ${deleteModal.user.id}...`);
      await deleteUserByAdmin(deleteModal.user.id, token);
      
      // Remove user from state
      setDonors(donors.filter(u => u.id !== deleteModal.user.id));
      
      // Close modal
      setDeleteModal({ show: false, user: null });
      
      // Show success notification
      showNotification('User deleted successfully!', 'success');
    } catch (err) {
      console.error("Delete error:", err);
      showNotification(err.message || 'Failed to delete user', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, user: null });
  };

  const showNotification = (message, type) => {
    // You can replace this with a toast library like react-toastify
    alert(message);
  };

  if (loading) {
    return (
      <div className="admin-page-wrapper">
        <AdminNavbar />
        <div className="admin-loader">
          <div className="spinner"></div>
          Loading Admin Panel...
        </div>
        <Footer />
      </div>
    );
  }

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
            <div className="admin-error-card">
              <strong>Error:</strong> {error}
            </div>
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
                    <th>Actions</th>
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
                        <td>
                          <button
                            onClick={() => handleDeleteClick(person)}
                            className="delete-btn"
                            title="Delete user"
                            disabled={person.role === 'admin'}
                          >
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="empty-state">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button className="modal-close" onClick={handleDeleteCancel}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="warning-icon">⚠️</div>
              <p className="modal-message">
                Are you sure you want to delete user <strong>{deleteModal.user?.userName || deleteModal.user?.userEmail}</strong>?
              </p>
              <p className="modal-warning">
                This action cannot be undone. All associated data (donor registrations, applications, etc.) will be permanently removed from the database.
              </p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-cancel" 
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="btn-delete" 
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="spinner-small"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;