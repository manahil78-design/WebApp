import React, { useEffect, useState } from "react";
import "./AppList.css";

const API_URL = "https://webapp-hhcw.onrender.com/api/products";

function AppList({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    serialNumber: "",
    name: "",
    price: "",
  });

  const getSerialNumber = (product) =>
    product.serialNumber ?? product.serialNo ?? product.id ?? "";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load products.");
      }

      setProducts(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const startEditing = (product) => {
    setEditingId(product._id);
    setEditData({
      serialNumber: String(getSerialNumber(product)),
      name: product.name || "",
      price: String(product.price ?? ""),
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (mongoId) => {
    if (
      !editData.serialNumber.trim() ||
      !editData.name.trim() ||
      editData.price === "" ||
      Number(editData.price) < 0
    ) {
      alert("Please enter a valid serial number, name and price.");
      return;
    }

    const updatedProduct = {
      serialNumber: Number(editData.serialNumber),
      name: editData.name.trim(),
      price: Number(editData.price),
    };

    try {
      const response = await fetch(`${API_URL}/${mongoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update product.");
      }

      setProducts((previous) =>
        previous.map((product) =>
          product._id === mongoId ? result : product
        )
      );

      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (mongoId, productName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${productName}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${mongoId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not delete product.");
      }

      setProducts((previous) =>
        previous.filter((product) => product._id !== mongoId)
      );

      if (editingId === mongoId) {
        setEditingId(null);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredProducts = products.filter((product) => {
    const serial = String(getSerialNumber(product));
    const name = String(product.name || "");
    const price = String(product.price ?? "");

    const searchText = search.toLowerCase();

    return (
      serial.toLowerCase().includes(searchText) ||
      name.toLowerCase().includes(searchText) ||
      price.toLowerCase().includes(searchText)
    );
  });

  const totalValue = products.reduce(
    (total, product) => total + Number(product.price || 0),
    0
  );

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  return (
    <section className="inventory-section" id="inventory">
      <div className="inventory-heading">
        <div>
          <span className="section-kicker">MANAGEMENT DASHBOARD</span>
          <h2>App Inventory</h2>
          <p>Click any value to edit it directly in your inventory.</p>
        </div>

        <button className="refresh-btn" onClick={fetchProducts}>
          ↻ Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-purple">
          <div className="stat-icon">▦</div>
          <div>
            <p>Total Products</p>
            <h3>{products.length}</h3>
            <span>Products in your database</span>
          </div>
        </div>

        <div className="stat-card stat-blue">
          <div className="stat-icon">Rs</div>
          <div>
            <p>Total Inventory Value</p>
            <h3>{formatPrice(totalValue)}</h3>
            <span>Combined product value</span>
          </div>
        </div>

        <div className="stat-card stat-green">
          <div className="stat-icon">✓</div>
          <div>
            <p>System Status</p>
            <h3>Active</h3>
            <span>Inventory system is running</span>
          </div>
        </div>
      </div>

      <div className="records-panel">
        <div className="records-heading">
          <div>
            <span className="section-kicker">YOUR DATABASE</span>
            <h2>Product Records</h2>
            <p>Manage, edit and organize your products.</p>
          </div>

          <span className="record-count">
            {filteredProducts.length} RECORDS
          </span>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search by serial number, product or price..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        {loading ? (
          <div className="list-message">Loading your products...</div>
        ) : error ? (
          <div className="list-message error-message">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="list-message">
            {search
              ? "No products match your search."
              : "No products found. Add your first product above!"}
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>SERIAL NO.</th>
                  <th>PRODUCT NAME</th>
                  <th>PRICE (PKR)</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product, index) => {
                  const isEditing = editingId === product._id;

                  return (
                    <tr key={product._id}>
                      <td>
                        <span className="row-number">{index + 1}</span>
                      </td>

                      <td
                        className={!isEditing ? "editable-cell" : ""}
                        onClick={() => !isEditing && startEditing(product)}
                      >
                        {isEditing ? (
                          <input
                            className="inline-input"
                            type="number"
                            name="serialNumber"
                            value={editData.serialNumber}
                            onChange={handleEditChange}
                            aria-label="Serial number"
                          />
                        ) : (
                          <span className="serial-badge">
                            {getSerialNumber(product) || "—"}
                          </span>
                        )}
                      </td>

                      <td
                        className={!isEditing ? "editable-cell" : ""}
                        onClick={() => !isEditing && startEditing(product)}
                      >
                        {isEditing ? (
                          <input
                            className="inline-input name-input"
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            aria-label="Product name"
                          />
                        ) : (
                          <span className="product-name">
                            {product.name}
                          </span>
                        )}
                      </td>

                      <td
                        className={!isEditing ? "editable-cell" : ""}
                        onClick={() => !isEditing && startEditing(product)}
                      >
                        {isEditing ? (
                          <input
                            className="inline-input"
                            type="number"
                            min="0"
                            name="price"
                            value={editData.price}
                            onChange={handleEditChange}
                            aria-label="Product price"
                          />
                        ) : (
                          <span className="product-price">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </td>

                      <td>
                        {isEditing ? (
                          <div className="action-buttons">
                            <button
                              className="save-btn"
                              onClick={() => handleSave(product._id)}
                            >
                              Save
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="action-buttons">
                            <button
                              className="edit-btn"
                              onClick={() => startEditing(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleDelete(product._id, product.name)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="records-footer">
          <span>
            Showing {filteredProducts.length} of {products.length} products
          </span>
          <span>APPLIST INVENTORY STUDIO</span>
        </div>
      </div>
    </section>
  );
}

export default AppList;