
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="nexora-footer">
      <div className="nexora-footer-main">
        <div className="nexora-footer-brand">
          <Link to="/" className="nexora-footer-logo">
            NEXORA<span>.</span>
          </Link>
          <p>
            Thoughtfully selected technology for a more inspired everyday.
          </p>
          <a
            className="nexora-footer-email"
            href="mailto:manahilmasood78@gmail.com"
          >
            manahilmasood78@gmail.com ↗
          </a>
        </div>

        <div className="nexora-footer-column">
          <h3>EXPLORE</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop all</Link>
          <Link to="/about">Our story</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nexora-footer-column">
          <h3>DISCOVER</h3>
          <Link to="/shop">Technology</Link>
          <Link to="/shop">Audio</Link>
          <Link to="/shop">Accessories</Link>
        </div>

        <div className="nexora-footer-column">
          <h3>GET IN TOUCH</h3>
          <p>Questions? We'd love to hear from you.</p>
          <Link to="/contact">Contact our team ↗</Link>
        </div>
      </div>

      <div className="nexora-footer-bottom">
        <span>© {new Date().getFullYear()} NEXORA. All rights reserved.</span>
        <span>INDEPENDENT TECHNOLOGY RETAIL</span>
        <Link to="/about">MADE WITH THOUGHT ↗</Link>
      </div>
    </footer>
  );
}

export default Footer;
