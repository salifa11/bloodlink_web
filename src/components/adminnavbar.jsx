import { useState } from "react";
import "../css/AdminNavbar.css"; 

function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">
        <h1>BLOODLINK <span>ADMIN</span></h1>
      </div>

      <div
        className={`admin-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`admin-nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <a href="/admin-dashboard" onClick={closeMenu} className="active-link">
            Users List
          </a>
        </li>
        <li>
          <a href="/admin-event-form" onClick={closeMenu}>
            Create Event
          </a>
        </li>
        <li>
          <a href="/admin-donors" onClick={closeMenu}>
            Donors List
          </a>
        </li>
        <li>
          <a href="/admin-event-applications" onClick={closeMenu}>
            Event Applications
          </a>
        </li>
        <li>
          <a href="/admin/events" onClick={closeMenu}>
            Events List
          </a>
        </li>
        <li>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </li>
        
      </ul>
    </nav>
  );
}

export default AdminNavbar;