
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="hh-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#" className="hh-logo footer-logo">
            <span className="logo-symbol">H</span>
            <span>
              <strong>HOME HUNT</strong>
              <small>FIND YOUR PLACE</small>
            </span>
          </a>

          <p>
            Helping you discover beautiful spaces and
            find a place that truly feels like home.
          </p>
        </div>

        <div className="footer-links">
          <h4>EXPLORE</h4>
          <a href="#properties">All Properties</a>
          <a href="#properties">Homes for Sale</a>
          <a href="#properties">Homes for Rent</a>
        </div>

        <div className="footer-links">
          <h4>HOME HUNT</h4>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#properties">Find a Home</a>
        </div>

        <div className="footer-contact" id="contact">
          <h4>LET'S CONNECT</h4>
          <p>Have a question? We'd love to hear from you.</p>
          <a href="mailto:hello@homehunt.example">hello@homehunt.example</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 HOME HUNT. ALL RIGHTS RESERVED.</span>
        <span>MADE FOR FINDING YOUR PLACE.</span>
      </div>
    </footer>
  );
}

export default Footer;
