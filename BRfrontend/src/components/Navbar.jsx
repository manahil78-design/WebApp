
import "./Navbar.css";

function Navbar({ search, setSearch, activePage }) {
  return (
    <header className="cine-navbar">
      <div className="cine-navbar-page">
        <span className="cine-live-dot"></span>
        <span>{activePage}</span>
      </div>

      <label className="cine-search">
        <span className="cine-search-icon">⌕</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search movies, shows..."
          aria-label="Search movies and shows"
        />
        {search && (
          <button
            type="button"
            className="cine-clear-search"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </label>

      <div className="cine-navbar-actions">
        <button
          className="cine-notification"
          type="button"
          title="Notifications"
          onClick={() => window.alert("You're all caught up!")}
        >
          ♧
        </button>

        <button className="cine-profile" type="button" title="Your profile">
          <span>A</span>
          <small>▾</small>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
