
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProducts,
  getProductImages,
} from "../../services/api";
import { getProductDescription } from "../../components/ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    setSelectedImageIndex(0);
    setError("");

    getProducts()
      .then((products) => {
        const found = products.find((item) => item._id === id);

        if (!found) {
          setError("This product could not be found.");
        } else {
          setProduct(found);
        }
      })
      .catch(() => setError("Unable to load this product."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="details-page">
        <p>Loading product...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="details-page">
        <h1>Product unavailable</h1>
        <p>{error}</p>
        <Link to="/shop">Return to shop</Link>
      </main>
    );
  }

  const images = getProductImages(product);
  const mainImage = images[selectedImageIndex] || images[0] || "";

  function handleAddToCart() {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <main className="details-page">
      <div className="details-breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{" "}
        {product.name}
      </div>

      <section className="details-layout">
        <div className="details-gallery">
          <div className="details-image">
            {mainImage ? (
              <img src={mainImage} alt={product.name} />
            ) : (
              <span>PRODUCT PHOTOGRAPH</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="details-thumbnails">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`details-thumbnail ${
                    selectedImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImageIndex === index}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="details-information">
          <span className="section-eyebrow">
            {product.category || "TECHNOLOGY"}
          </span>

          <h1>{product.name}</h1>

          <p className="details-description">
            {getProductDescription(product)}
          </p>

          <strong className="details-price">
            Rs. {Number(product.price || 0).toLocaleString("en-PK")}
          </strong>

          <div className="details-quantity">
            <span>QUANTITY</span>

            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="details-add-button" onClick={handleAddToCart}>
            {added ? "ADDED TO CART ✓" : "ADD TO CART ↗"}
          </button>

          <Link to="/cart" className="details-cart-link">
            VIEW YOUR CART
          </Link>

          <div className="details-description-block">
            <h3>ABOUT THIS PRODUCT</h3>
            <p>
              {product.description || getProductDescription(product)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
