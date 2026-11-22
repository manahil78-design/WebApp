
import { Link } from "react-router-dom";
import { getProductImage } from "../../services/api";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

const descriptions = {
  smartphone:
    "A modern smartphone designed for smooth everyday performance, immersive viewing and effortless connectivity.",
  iphone:
    "Experience Apple's refined design, advanced camera technology and powerful everyday performance.",
  laptop:
    "A sleek and capable laptop for productivity, creativity and seamless multitasking.",
  tablet:
    "A versatile tablet with an immersive display, portable design and convenient everyday functionality.",
  headphones:
    "Enjoy immersive sound, comfortable listening and the freedom of wireless audio.",
  speaker:
    "Bring your music to life with rich portable sound and a modern compact design.",
  mouse:
    "Designed for precise control, responsive tracking and comfortable everyday gaming.",
};

export function getProductDescription(product) {
  const name = `${product?.name || ""} ${product?.category || ""}`.toLowerCase();

  if (name.includes("iphone")) return descriptions.iphone;
  if (name.includes("smartphone") || name.includes("samsung")) return descriptions.smartphone;
  if (name.includes("laptop") || name.includes("macbook")) return descriptions.laptop;
  if (name.includes("tablet") || name.includes("ipad")) return descriptions.tablet;
  if (name.includes("headphone") || name.includes("airpod")) return descriptions.headphones;
  if (name.includes("speaker") || name.includes("jbl")) return descriptions.speaker;
  if (name.includes("mouse")) return descriptions.mouse;

  return product?.description || "Discover a thoughtfully designed piece of technology for everyday life.";
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const image = getProductImage(product);

  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`} className="product-card-image">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card-empty">
            <span>PRODUCT PHOTOGRAPH</span>
          </div>
        )}
        <span className="product-view">EXPLORE ↗</span>
      </Link>

      <div className="product-card-info">
        <span className="product-category">
          {product.category || "TECHNOLOGY"}
        </span>

        <h3>{product.name}</h3>

        <p className="product-description">
          {getProductDescription(product)}
        </p>

        <div className="product-card-bottom">
          <strong>
            Rs. {Number(product.price || 0).toLocaleString("en-PK")}
          </strong>

          <button
            className="product-add-button"
            onClick={() => addToCart(product)}
            type="button"
          >
            ADD TO CART +
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
