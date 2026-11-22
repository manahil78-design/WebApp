
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProductImage } from "../../services/api";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <span className="cart-icon-large">◇</span>
          <span className="section-eyebrow">YOUR COLLECTION</span>
          <h1>Your cart is waiting.</h1>
          <p>Discover something you'll love and add it to your collection.</p>
          <Link to="/shop" className="checkout-button">EXPLORE PRODUCTS ↗</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-heading">
          <span className="section-eyebrow">YOUR SELECTION</span>
          <h1>Shopping <em>cart.</em></h1>
          <p>{cartItems.length} different product(s) in your cart</p>
        </div>

        <div className="cart-layout">
          <section className="cart-list">
            {cartItems.map((item) => {
              const image = getProductImage(item);

              return (
                <article className="cart-item" key={item._id}>
                  <div className="cart-item-image">
                    {image ? (
                      <img src={image} alt={item.name} />
                    ) : (
                      <span>PRODUCT</span>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <span>{item.category || "TECHNOLOGY"}</span>
                    <h3>{item.name}</h3>
                    <strong>
                      Rs. {Number(item.price || 0).toLocaleString("en-PK")}
                    </strong>

                    <div className="quantity-control">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong>
                      Rs. {(Number(item.price || 0) * item.quantity).toLocaleString("en-PK")}
                    </strong>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeFromCart(item._id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="cart-summary">
            <span className="section-eyebrow">ORDER SUMMARY</span>
            <h2>Your total</h2>
            <div className="summary-line">
              <span>Items</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>Rs. {totalAmount.toLocaleString("en-PK")}</span>
            </div>
            <div className="summary-line">
              <span>Payment</span>
              <span>Not required</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {totalAmount.toLocaleString("en-PK")}</strong>
            </div>
            <button
              className="checkout-button"
              type="button"
              onClick={() => navigate("/checkout")}
            >
              CONTINUE TO CHECKOUT ↗
            </button>
            <Link to="/shop" className="continue-shopping">CONTINUE SHOPPING</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
