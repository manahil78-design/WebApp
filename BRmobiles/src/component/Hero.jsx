
import "./Hero.css";
import heroPortrait from "../assets/hero-portrait.png";

function Hero() {
  return (
    <main className="nexora-hero" id="home">
      <div className="nh-glow nh-glow-left"></div>
      <div className="nh-glow nh-glow-right"></div>

      <div className="nh-layout">
        {/* LEFT: TEXT AND ACTIONS */}
        <section className="nh-content">
          <div className="nh-eyebrow">
            <span className="nh-sparkle">✦</span>
            <span>BUILD</span>
            <span className="nh-dot">•</span>
            <span>CREATE</span>
            <span className="nh-dot">•</span>
            <span>GROW</span>
          </div>

          <h1 className="nh-heading">
            Turn Your Ideas
            <br />
            Into <span className="nh-gradient">Reality</span>
          </h1>

          <p className="nh-description">
            We craft stunning digital experiences, powerful web
            solutions and beautiful designs that help your brand
            stand out in the digital world.
          </p>

          <div className="nh-actions">
            <a href="#contact" className="nh-btn-primary">
              Start Your Project <span>→</span>
            </a>

            <a href="#about" className="nh-btn-video">
              <span className="nh-play">▶</span>
              Watch Video
            </a>
          </div>

          <div className="nh-stats">
            <div className="nh-stat">
              <strong>10K<span>+</span></strong>
              <p>Happy Clients</p>
            </div>

            <div className="nh-stat-divider"></div>

            <div className="nh-stat">
              <strong>500<span>+</span></strong>
              <p>Projects Completed</p>
            </div>

            <div className="nh-stat-divider"></div>

            <div className="nh-stat">
              <strong>4.9<span className="nh-star">★</span></strong>
              <p>Avg. Rating</p>
            </div>
          </div>
        </section>

        {/* RIGHT: CINEMATIC VISUAL */}
        <section className="nh-visual" aria-label="Creative digital artwork">
          <div className="nh-orbit nh-orbit-one"></div>
          <div className="nh-orbit nh-orbit-two"></div>
          <div className="nh-orbit nh-orbit-three"></div>

          <div className="nh-portrait-glow"></div>

          <img
            src={heroPortrait}
            alt="Futuristic creative portrait with neon lighting"
            className="nh-portrait"
          />

          <div className="nh-floating-card nh-design-card">
            <div className="nh-card-icon nh-purple">✦</div>
            <div>
              <strong>Creative Design</strong>
              <p>Beautiful and functional<br />designs for your brand.</p>
            </div>
          </div>

          <div className="nh-floating-card nh-code-card">
            <div className="nh-card-icon nh-blue">&lt;/&gt;</div>
            <div>
              <strong>Web Development</strong>
              <p>Fast, secure and scalable<br />web applications.</p>
            </div>
          </div>

          <div className="nh-floating-card nh-growth-card">
            <p>Your Growth</p>
            <strong>+258%</strong>

            <svg
              className="nh-chart"
              viewBox="0 0 220 55"
              fill="none"
              aria-label="Upward growth chart"
            >
              <defs>
                <linearGradient id="nh-chart-gradient">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              <path
                d="M2 45 C20 42 24 48 40 38 S65 50 83 25 S111 39 130 12 S153 34 171 15 S192 29 218 3"
                stroke="url(#nh-chart-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="nh-star-decoration nh-star-one">✦</span>
          <span className="nh-star-decoration nh-star-two">✧</span>
          <span className="nh-star-decoration nh-star-three">✦</span>
        </section>
      </div>

      {/* TRUSTED BRANDS */}
      <section className="nh-brands">
        <p className="nh-brands-title">
          TRUSTED BY INNOVATIVE BRANDS
        </p>

        <div className="nh-brand-list">
          <span className="nh-brand">◉ Spotify</span>
          <span className="nh-brand">▣ Notion</span>
          <span className="nh-brand">◈ Figma</span>
          <span className="nh-brand">N Nexora</span>
          <span className="nh-brand">◢ Adobe</span>
          <span className="nh-brand">◉ Discord</span>
          <span className="nh-brand">◉ GitHub</span>
        </div>
      </section>
    </main>
  );
}

export default Hero;
