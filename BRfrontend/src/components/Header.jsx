
import React from "react";
import "./Header.css";

function Header({ favoritesCount }) {
  return (
    <header className="hh-header">
      <a href="#" className="hh-logo">
        <span className="logo-symbol">H</span>
        <span>
          <strong>HOME HUNT</strong>
          <small>FIND YOUR PLACE</small>
        </span>
      </a>

      <nav className="hh-nav">
        <a href="#" className="active">Home</a>
        <a href="#properties">Explore Homes</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="hh-header-actions">
        <a href="#properties" className="saved-link">
          ♡ <span>Saved</span>
          {favoritesCount > 0 && (
            <span className="saved-count">{favoritesCount}</span>
          )}
        </a>
        <a href="#properties" className="list-property-btn">
          Explore Properties <span>↗</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
