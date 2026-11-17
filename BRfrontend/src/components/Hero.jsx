
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hh-hero">
      <div className="hero-image"></div>

      <div className="hero-content">
        <span className="hero-eyebrow">
          <span></span> YOUR NEXT CHAPTER STARTS HERE
        </span>

        <h1>
          Find a place
          <br />
          <em>to call home.</em>
        </h1>

        <p>
          Discover exceptional homes, beautiful spaces and
          <br className="desktop-break" />
          places that feel like they were made for you.
        </p>

        <a href="#properties" className="hero-button">
          Explore Properties <span>↗</span>
        </a>

        <div className="hero-note">
          <span className="hero-line"></span>
          DISCOVER. CONNECT. BELONG.
        </div>
      </div>

      <div className="hero-bottom-label">
        <span>01 / 04</span>
        <span>CURATED HOMES & SPACES</span>
      </div>
    </section>
  );
}

export default Hero;
