
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="nexora-header">
      <div className="nexora-header-inner">
        <Link to="/" className="nexora-logo" onClick={closeMenu}>
          NEXORA<span>.</span>
          <small>TECHNOLOGY, THOUGHTFULLY CHOSEN</small>
        </Link>

        <button
          className="nexora-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className={`nexora-nav ${menuOpen ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
          <NavLink to="/about" onClick={closeMenu}>Our Story</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </nav>

        <Link to="/shop" className="nexora-header-cta">
          EXPLORE <span>↗</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
