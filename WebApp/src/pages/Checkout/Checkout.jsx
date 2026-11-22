
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/api";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const order = await createOrder({
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      });

      setOrderReference(
        order.order?._id || order._id || order.message || "Order received"
      );

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <span className="success-symbol">✓</span>
          <span className="section-eyebrow">ORDER SUBMITTED</span>
          <h1>Thank you for your <em>order.</em></h1>
          <p>
            Your test order has been submitted successfully. The store team
            can now review it in the admin dashboard.
          </p>
          <small>Reference: {String(orderReference)}</small>
          <Link to="/" className="checkout-submit">BACK TO HOME ↗</Link>
        </section>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <h1>Your cart is empty.</h1>
          <p>Add a product before continuing to checkout.</p>
          <Link to="/shop" className="checkout-submit">EXPLORE PRODUCTS ↗</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-heading">
          <span className="section-eyebrow">ALMOST THERE</span>
          <h1>Complete your <em>order.</em></h1>
          <p>This is a test order. No online payment is required.</p>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Customer details</h2>
            <p>Enter your contact information so the admin team can view your order.</p>

            <label htmlFor="customerName">Full name</label>
            <input
              id="customerName"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              type="tel"
              required
            />

            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your complete address"
              autoComplete="street-address"
              rows="4"
              required
            />

            {error && <div className="checkout-error">{error}</div>}

            <button className="checkout-submit" type="submit" disabled={loading}>
              {loading ? "SUBMITTING ORDER..." : "PLACE TEST ORDER ↗"}
            </button>

            <Link to="/cart" className="checkout-back">← BACK TO CART</Link>
          </form>

          <aside className="checkout-order-summary">
            <span className="section-eyebrow">YOUR ORDER</span>
            <h2>Order summary</h2>

            {cartItems.map((item) => (
              <div className="checkout-order-item" key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>Quantity: {item.quantity}</span>
                </div>
                <strong>
                  Rs. {(Number(item.price || 0) * item.quantity).toLocaleString("en-PK")}
                </strong>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>
              <strong>Rs. {totalAmount.toLocaleString("en-PK")}</strong>
            </div>
            <p className="checkout-no-payment">
              Test checkout only · No payment collected
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
