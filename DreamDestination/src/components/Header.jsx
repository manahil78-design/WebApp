import "./Header.css";

function Header({ favoritesCount, showFavoritesOnly, setShowFavoritesOnly }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Elsewhere home">
        <span className="brand-icon">≈</span>
        <span>ELSEWHERE</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#destinations">Destinations</a>
        <a href="#travel-types">Travel Types</a>
      </nav>

      <div className="header-actions">
        <button
          className={`favorite-nav ${showFavoritesOnly ? "active" : ""}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          aria-pressed={showFavoritesOnly}
          aria-label={
            showFavoritesOnly ? "Show all destinations" : "Show saved destinations"
          }
        >
          ♡ <span>Saved ({favoritesCount})</span>
        </button>

        <a className="plan-button" href="#destinations">
          Explore trips <span>↗</span>
        </a>
      </div>
    </header>
  );
}

export default Header;