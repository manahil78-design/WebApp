
import { useState } from "react";
import "./header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <a href="#home" className="header-logo">
        <span className="logo-box">N</span>
        <span>NEXORA</span>
      </a>

      <nav className={`header-nav ${menuOpen ? "show-menu" : ""}`}>
        <a href="#home" className="nav-item active">Home</a>
        <a href="#explore" className="nav-item">Explore</a>
        <a href="#features" className="nav-item">Features</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#contact" className="nav-item">Contact</a>

        <a href="#get-started" className="mobile-button">
          Get Started ↗
        </a>
      </nav>

      <div className="header-actions">
        <a href="#get-started" className="header-button">
          Get Started <span>↗</span>
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

export default Header;
