
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">ع</div>

        <div>
          <h2>Tarjuma</h2>
          <span>English → Urdu</span>
        </div>
      </div>

      <nav className="navbar-links">
        <a href="#translator">Translator</a>
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
      </nav>

      <a href="#translator" className="navbar-button">
        Start Translating →
      </a>
    </header>
  );
}

export default Navbar;