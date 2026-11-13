
import "./Sidebar.css";

const menuItems = [
  { icon: "⌂", label: "Home" },
  { icon: "⌕", label: "Explore" },
  { icon: "♨", label: "Trending" },
  { icon: "▦", label: "Categories" },
  { icon: "♡", label: "My List" },
];

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="cine-sidebar">
      <div className="cine-logo">
        <span className="cine-logo-mark">C</span>
        <span>CINE<span>JOY</span></span>
      </div>

      <nav className="cine-side-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`cine-side-link ${
              activePage === item.label ? "active" : ""
            }`}
            onClick={() => onNavigate(item.label)}
          >
            <span className="cine-side-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="cine-sidebar-bottom">
        <div className="cine-premium-icon">✦</div>
        <p>Enjoy the best of cinema.</p>
        <span>Your next favorite awaits.</span>
      </div>

      <div className="cine-sidebar-version">CINEJOY · YOUR MOVIE WORLD</div>
    </aside>
  );
}

export default Sidebar;
