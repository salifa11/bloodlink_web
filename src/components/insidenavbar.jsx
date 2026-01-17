import { useState } from "react";
import "../css/insidenavbar.css";

function InsideNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="inside-navbar">
      <div className="inside-navbar-logo">
        <h1>BLOODLINK</h1>
      </div>

      <div
        className={`inside-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`inside-nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="/dashboard" onClick={closeMenu}>Dashboard</a></li>
        <li><a href="/profile" onClick={closeMenu}>Profile</a></li>
        <li><a href="/donate-blood" onClick={closeMenu}>Donate Blood</a></li>
        <li><a href="/view-events" onClick={closeMenu}>View Events</a></li>
      </ul>
    </nav>
  );
}

export default InsideNavbar;