import React, { useState } from "react";
import "./AppForm.css";

const API_URL = "http://localhost:3000/api/products";

function AppForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    serialNumber: "",
    name: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const newProduct = {
      serialNumber: Number(formData.serialNumber),
      name: formData.name.trim(),
      price: Number(formData.price),
    };

    if (!newProduct.serialNumber || !newProduct.name) {
      setMessage("Please enter a valid serial number and product name.");
      setMessageType("error");
      return;
    }

    if (newProduct.price < 0 || formData.price === "") {
      setMessage("Please enter a valid price.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not add product.");
      }

      setFormData({
        serialNumber: "",
        name: "",
        price: "",
      });

      setMessage("Product added successfully!");
      setMessageType("success");
      onProductAdded();
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-product-panel" id="products">
      <div className="form-heading">
        <div>
          <span className="section-kicker">INVENTORY MANAGEMENT</span>
          <h2>Add New Product</h2>
          <p>Create a new product record in your inventory.</p>
        </div>

        <div className="form-plus-icon">＋</div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            id="serialNumber"
            type="number"
            name="serialNumber"
            placeholder="e.g. 101"
            value={formData.serialNumber}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            name="name"
            placeholder="e.g. Wireless Headphones"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="productPrice">Price (PKR)</label>
          <input
            id="productPrice"
            type="number"
            name="price"
            placeholder="e.g. 4500"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <button className="add-product-btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "+ Add Product"}
        </button>
      </form>

      {message && (
        <p className={`form-message ${messageType}`}>
          {message}
        </p>
      )}
    </section>
  );
}

export default AppForm;