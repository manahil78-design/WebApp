import { useState } from "react";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thanks for joining our travel inspiration list!");
    setEmail("");
  }

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-column">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon">≈</span>
            <span>ELSEWHERE</span>
          </a>

          <p>Better places. Brighter stories.</p>
          <p className="footer-small">
            Find the places that make you feel somewhere new.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <a href="#home">Home</a>
          <a href="#destinations">Destinations</a>
          <a href="#travel-types">Travel types</a>
        </div>

        <div className="footer-column">
          <h3>Our world</h3>
          <a href="#destinations">Our collection</a>
          <a href="#travel-types">Find your escape</a>
          <a href="#home">Our philosophy</a>
        </div>

        <div className="footer-column newsletter-column">
          <h3>A little inspiration?</h3>
          <p>Beautiful places, delivered occasionally.</p>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">
              Your email address
            </label>

            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <button type="submit" aria-label="Subscribe to travel inspiration">
              →
            </button>
          </form>

          <p className="newsletter-message" aria-live="polite">
            {message}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ELSEWHERE. Made for the curious.</p>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default Footer;