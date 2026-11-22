
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>

      <div className="hero-content">
        <span className="hero-label">
          <span className="hero-dot"></span>
          THE FUTURE OF TECHNOLOGY
        </span>

        <h1>
          Technology
          <br />
          <span>Without</span>
          <br />
          Limits.
        </h1>

        <p>
          Discover innovative technology designed to make
          everyday life smarter, simpler and more exciting.
        </p>

        <div className="hero-buttons">
          <Link to="/shop" className="hero-primary">
            Explore Collection <span>↗</span>
          </Link>

          <a href="#featured" className="hero-secondary">
            Discover More ↓
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>01</strong>
            <span>Modern Technology</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Curated Collection</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Smarter Living</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orbit orbit-one"></div>
        <div className="hero-orbit orbit-two"></div>

        <div className="hero-product-panel">
          <span className="hero-panel-label">NEXT GENERATION</span>
          <div className="hero-product-symbol">N.</div>
          <span className="hero-panel-bottom">
            INNOVATION STARTS HERE
          </span>
        </div>

        <div className="hero-floating-card">
          <span>✦</span>
          <div>
            <strong>Explore the future</strong>
            <small>Technology reimagined.</small>
          </div>
        </div>
      </div>

      <div className="hero-bottom-line">
        <span>SCROLL TO EXPLORE</span>
        <span>EST. FOR THE FUTURE — 2026</span>
      </div>
    </section>
  );
}

export default Hero;
