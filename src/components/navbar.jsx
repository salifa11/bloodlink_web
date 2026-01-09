import { useState } from "react";
import "../css/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper function to close menu after clicking a link
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>BLOODLINK</h1>
      </div>

      {/* Hamburger Icon with dynamic 'open' class */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><a href="/" onClick={closeMenu}>Home</a></li>
        <li><a href="/donate" onClick={closeMenu}>Donate</a></li>
        <li><a href="/about" onClick={closeMenu}>About Us</a></li>
        <li><a href="/contact" onClick={closeMenu}>Contact</a></li>
              </ul>
    </nav>
  );
}

export default Navbar;