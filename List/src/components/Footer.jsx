
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-logo">ع</div>

        <div>
          <h3>Tarjuma</h3>
          <p>Making English understandable in Urdu.</p>
        </div>
      </div>

      <div className="footer-right">
        <p>English → اردو</p>
        <span>Built with React</span>
      </div>
    </footer>
  );
}

export default Footer;