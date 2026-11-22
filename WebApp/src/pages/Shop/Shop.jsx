
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/api";
import "./Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category || "General")
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      (product.category || "General") === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="shop-page">
      <section className="shop-heading">
        <div className="shop-heading-inner">
          <span className="section-eyebrow">
            THE COMPLETE COLLECTION
          </span>

          <h1>
            Explore the <span>Store.</span>
          </h1>

          <p>
            Discover thoughtfully selected technology.
            Find something extraordinary for your everyday life.
          </p>

          <a href="#shop-products" className="shop-explore-link">
            EXPLORE THE COLLECTION <span>↓</span>
          </a>
        </div>

        <div className="shop-showcase">
          <div className="showcase-main">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85"
              alt="Modern smartphone"
            />
            <div className="showcase-label">
              <span>01 / MOBILE</span>
              <strong>Made to move with you.</strong>
            </div>
          </div>

          <div className="showcase-side">
            <div className="showcase-small showcase-laptop">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85"
                alt="Premium laptop"
              />
              <span>CREATIVITY WITHOUT LIMITS</span>
            </div>

            <div className="showcase-small showcase-audio">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85"
                alt="Colourful premium headphones"
              />
              <span>SOUND, REIMAGINED</span>
            </div>
          </div>
        </div>

        <div className="shop-heading-bottom">
          <span>DESIGNED FOR EVERYDAY DISCOVERY</span>
          <span>TECHNOLOGY / DESIGN / EXPERIENCE</span>
        </div>
      </section>

      <section className="shop-content" id="shop-products">
        <div className="shop-section-intro">
          <div>
            <span className="section-eyebrow">FIND YOUR NEXT FAVOURITE</span>
            <h2>Something for <span>every day.</span></h2>
          </div>
          <p>
            From personal essentials to powerful everyday companions,
            explore our growing collection.
          </p>
        </div>

        <div className="shop-toolbar">
          <div className="shop-categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search products"
          />
        </div>

        {loading && (
          <p className="shop-message">Loading products...</p>
        )}

        {error && (
          <p className="shop-message">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="shop-results">
              SHOWING {filteredProducts.length} PRODUCTS
            </div>

            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <p className="shop-message">
                No products match your search.
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Shop;
