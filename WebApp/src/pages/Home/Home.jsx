
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/api";
import "./Home.css";

const deviceImage =
  "https://images.unsplash.com/photo-1792673570294-7bac69cbeaca?auto=format&fit=crop&w=1800&q=85";

const workspaceImage =
  "https://images.unsplash.com/photo-1561419489-5650de8b8849?auto=format&fit=crop&w=1400&q=85";

const descriptions = {
  smartphone: "A beautifully designed foldable smartphone for everyday life.",
  iphone: "A refined smartphone experience, made for creativity and connection.",
  laptop: "Powerful performance and elegant design for work and inspiration.",
  tablet: "A versatile screen for ideas, entertainment and everything between.",
  "wireless headphones": "Immersive listening with comfort and wireless freedom.",
  "bluetooth speaker": "Bring your favourite sound along wherever the day takes you.",
  "gaming mouse": "Responsive control and precision for every gaming session."
};

function getDescription(product) {
  if (product.description?.trim()) return product.description;

  const name = (product.name || "").toLowerCase();

  return Object.entries(descriptions).find(([key]) =>
    name.includes(key)
  )?.[1] || "Discover thoughtful technology designed for everyday life.";
}

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const data = await getProducts();
        if (active) setProducts(data);
      } catch (error) {
        console.error("Unable to load products:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="nexora-home">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="home-kicker">THE NEXORA EDIT / 2026</span>

          <h1>
            A more thoughtful
            <br />
            kind of <em>technology.</em>
          </h1>

          <p>
            Discover beautifully considered devices and everyday
            essentials, selected to make life feel a little more effortless.
          </p>

          <div className="home-hero-actions">
            <Link to="/shop" className="home-button">
              EXPLORE THE COLLECTION <span>↗</span>
            </Link>

            <Link to="/about" className="home-text-link">
              OUR STORY
            </Link>
          </div>
        </div>

        <div className="home-hero-image">
          <img src={deviceImage} alt="A collection of modern Apple devices" />

          <div className="hero-image-caption">
            <span>DESIGN MEETS POSSIBILITY</span>
            <span>01 — NEXORA COLLECTION</span>
          </div>
        </div>

        <div className="home-hero-index">01 / 04</div>
      </section>

      {/* INTRO STRIP */}
      <section className="home-intro-strip">
        <span>CURATED TECHNOLOGY</span>
        <span className="intro-line"></span>
        <p>Good design. Useful innovation. Everyday inspiration.</p>
      </section>

      {/* FEATURE STORY */}
      <section className="home-feature">
        <div className="home-feature-image">
          <img
            src={workspaceImage}
            alt="Apple laptop, tablet and phone arranged together"
          />
          <span className="feature-image-tag">THE EVERYDAY EDIT — 01</span>
        </div>

        <div className="home-feature-copy">
          <span className="home-kicker">A BETTER EVERYDAY</span>

          <h2>
            Made for the way you <em>think.</em>
          </h2>

          <p>
            From the first idea of the morning to the last thing you do
            at night, the right technology can make every moment feel
            more seamless.
          </p>

          <Link to="/shop" className="home-underlined-link">
            FIND YOUR NEXT FAVOURITE ↗
          </Link>

          <div className="feature-number">
            <strong>01</strong>
            <span>THOUGHTFULLY SELECTED</span>
          </div>
        </div>
      </section>

      {/* COLORFUL EDITORIAL BANNER */}
      <section className="home-color-story">
        <div className="color-story-copy">
          <span className="home-kicker">A LITTLE MORE YOU</span>
          <h2>
            Technology should
            <br />
            feel like <em>possibility.</em>
          </h2>
          <p>
            For the big ideas, the little moments and everything
            you want to make happen.
          </p>
          <Link to="/shop" className="color-story-link">
            FIND WHAT MOVES YOU <span>↗</span>
          </Link>
        </div>

        <div className="color-story-art" aria-hidden="true">
          <div className="color-orbit orbit-one"></div>
          <div className="color-orbit orbit-two"></div>
          <div className="color-orbit orbit-three"></div>
          <div className="color-art-center">N.</div>
          <span className="color-art-label">MAKE ROOM FOR WHAT'S NEXT</span>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="home-products" id="featured">
        <div className="home-section-heading">
          <div>
            <span className="home-kicker">THE COLLECTION</span>
            <h2>
              Considered <em>essentials.</em>
            </h2>
          </div>

          <Link to="/shop" className="home-underlined-link">
            VIEW ALL PRODUCTS ↗
          </Link>
        </div>

        {loading ? (
          <p className="home-status">Preparing the collection...</p>
        ) : featuredProducts.length > 0 ? (
          <div className="home-product-grid">
            {featuredProducts.map((product) => (
              <div className="home-product-item" key={product._id}>
                <ProductCard product={product} />
                <p className="home-product-description">
                  {getDescription(product)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="home-status">
            Our collection is being prepared. Please visit again soon.
          </p>
        )}
      </section>

      {/* BRAND STATEMENT */}
      <section className="home-brand">
        <span className="home-kicker">THE NEXORA PHILOSOPHY</span>

        <h2>
          Not more technology.
          <br />
          <em>Better choices.</em>
        </h2>

        <p>
          We believe the best products bring clarity, creativity and
          convenience into everyday life. That's the thinking behind NEXORA.
        </p>

        <Link to="/about" className="home-button home-button-light">
          GET TO KNOW US <span>↗</span>
        </Link>
      </section>

      {/* CONTACT */}
      <section className="home-contact">
        <div>
          <span className="home-kicker">A QUESTION? WE'RE HERE.</span>
          <h2>
            Let's make things <em>simple.</em>
          </h2>
        </div>

        <Link to="/contact" className="home-underlined-link">
          GET IN TOUCH ↗
        </Link>
      </section>

    </main>
  );
}

export default Home;
