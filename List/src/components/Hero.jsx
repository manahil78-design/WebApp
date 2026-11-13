import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>

      <div className="hero-content">
        <div className="hero-badge">
          ✦ ENGLISH → اردو
        </div>

        <h1>
          Words change.
          <br />
          <span>Meaning connects.</span>
        </h1>

        <p>
          Translate English into natural, beautiful Urdu
          with a simple and elegant experience designed for
          everyday communication.
        </p>

        <div className="hero-actions">
          <a href="#translator" className="hero-primary">
            Start Translating →
          </a>

          <a href="#how-it-works" className="hero-secondary">
            How it works
          </a>
        </div>
      </div>

      <div className="hero-preview">
        <div className="preview-top">
          <span className="preview-dot"></span>
          <span>Live Translation</span>
        </div>

        <div className="preview-text english-text">
          Hello, how are you today?
        </div>

        <div className="preview-arrow">↓</div>

        <div className="preview-text urdu-text">
          ہیلو، آج آپ کیسے ہیں؟
        </div>
      </div>
    </section>
  );
}

export default Hero;