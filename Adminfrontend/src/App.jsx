
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://webapp-hhcw.onrender.com";

const emptyProduct = {
  name: "",
  serialNumber: "",
  price: "",
  category: "",
  description: "",
  stock: "",
};

function App() {
  const [token, setToken] = useState(
    sessionStorage.getItem("adminToken") || ""
  );

  const [admin, setAdmin] = useState(
    JSON.parse(sessionStorage.getItem("adminUser") || "null")
  );

  const [activePage, setActivePage] = useState("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [productImages, setProductImages] = useState([]);
  const [savingProduct, setSavingProduct] = useState(false);

  async function request(url, options = {}) {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        logout();
      }
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  }

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoginLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminUser", JSON.stringify(data.admin));

      setToken(data.token);
      setAdmin(data.admin);
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoginLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    setToken("");
    setAdmin(null);
    setProducts([]);
    setOrders([]);
    setActivePage("dashboard");
  }

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [productData, orderData] = await Promise.all([
        request("/api/products"),
        request("/api/orders"),
      ]);

      setProducts(Array.isArray(productData) ? productData : productData.products || []);
      setOrders(orderData.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  function openAddProduct() {
    setEditingProduct(null);
    setProductForm(emptyProduct);
    setProductImages([]);
    setShowProductForm(true);
    setError("");
    setSuccess("");
  }

  function openEditProduct(product) {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      serialNumber: product.serialNumber ?? "",
      price: product.price ?? "",
      category: product.category || "",
      description: product.description || "",
      stock: product.stock ?? 0,
    });
    setProductImages([]);
    setShowProductForm(true);
    setError("");
    setSuccess("");
  }

  function handleProductInput(event) {
    const { name, value } = event.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    setProductImages(Array.from(event.target.files || []).slice(0, 3));
  }

  async function saveProduct(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!editingProduct && productImages.length !== 3) {
      setError("Please select exactly 3 product images.");
      return;
    }

    if (productImages.length > 0 && productImages.length !== 3) {
      setError("Select exactly 3 images to replace the current gallery.");
      return;
    }

    setSavingProduct(true);

    try {
      const formData = new FormData();

      Object.entries(productForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      productImages.forEach((file) => {
        formData.append("images", file);
      });

      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : "/api/products";

      await request(url, {
        method: editingProduct ? "PUT" : "POST",
        body: formData,
      });

      setShowProductForm(false);
      setProductForm(emptyProduct);
      setProductImages([]);
      setSuccess(
        editingProduct
          ? "Product updated successfully."
          : "Product added successfully."
      );

      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingProduct(false);
    }
  }

  async function deleteProduct(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await request(`/api/products/${productId}`, {
        method: "DELETE",
      });

      setSuccess("Product deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateOrderStatus(orderId, status) {
    setError("");
    setSuccess("");

    try {
      await request(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      setSuccess("Order status updated.");
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((total, order) => total + Number(order.totalAmount || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const money = (amount) =>
    `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

  if (!token) {
    return (
      <main className="login-page">
        <div className="login-decoration">
          <span className="login-orbit orbit-one" />
          <span className="login-orbit orbit-two" />
          <span className="login-glow" />
        </div>

        <section className="login-card">
          <div className="brand-mark">N</div>
          <p className="eyebrow">STORE MANAGEMENT</p>
          <h1>Welcome back.</h1>
          <p className="login-subtitle">
            Sign in to access your administration panel.
          </p>

          {error && <div className="alert error-alert">{error}</div>}

          <form onSubmit={handleLogin}>
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className="primary-button login-button"
              type="submit"
              disabled={loginLoading}
            >
              {loginLoading ? "SIGNING IN..." : "SIGN IN TO DASHBOARD"}
              <span>↗</span>
            </button>
          </form>

          <p className="login-footer">
            Authorized administrators only
          </p>
        </section>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">N</div>
          <div>
            <strong>NOVA</strong>
            <span>ADMINISTRATION</span>
          </div>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <button
            className={activePage === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("dashboard")}
          >
            <span>▦</span> Overview
          </button>

          <button
            className={activePage === "products" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("products")}
          >
            <span>□</span> Products
            <small>{products.length}</small>
          </button>

          <button
            className={activePage === "orders" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("orders")}
          >
            <span>▤</span> Orders
            <small>{orders.length}</small>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="avatar">
              {(admin?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <strong>{admin?.name || "Administrator"}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button className="logout-button" onClick={logout}>
            ↗ &nbsp; Sign out
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-caption">NOVA / ADMIN</span>
            <h2>
              {activePage === "dashboard"
                ? "Overview"
                : activePage === "products"
                  ? "Products"
                  : "Orders"}
            </h2>
          </div>

          <div className="topbar-right">
            <span className="online-indicator">● SYSTEM ONLINE</span>
            <button className="refresh-button" onClick={loadData}>
              ↻ Refresh
            </button>
          </div>
        </header>

        {error && (
          <div className="alert error-alert">
            {error}
            <button onClick={() => setError("")}>×</button>
          </div>
        )}

        {success && (
          <div className="alert success-alert">
            {success}
            <button onClick={() => setSuccess("")}>×</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">Loading store information...</div>
        ) : (
          <>
            {activePage === "dashboard" && (
              <section className="page-section">
                <div className="welcome-row">
                  <div>
                    <p className="eyebrow">STORE PERFORMANCE</p>
                    <h1>Good to see you, {admin?.name || "Admin"}.</h1>
                    <p>Here's what's happening with your store.</p>
                  </div>
                  <button
                    className="primary-button"
                    onClick={openAddProduct}
                  >
                    + ADD PRODUCT
                  </button>
                </div>

                <div className="stats-grid">
                  <StatCard
                    label="TOTAL PRODUCTS"
                    value={products.length}
                    icon="□"
                    note="Products in your catalog"
                  />
                  <StatCard
                    label="TOTAL ORDERS"
                    value={orders.length}
                    icon="▤"
                    note="Orders received"
                  />
                  <StatCard
                    label="PENDING ORDERS"
                    value={pendingOrders}
                    icon="◷"
                    note="Awaiting action"
                  />
                  <StatCard
                    label="ORDER VALUE"
                    value={money(totalSales)}
                    icon="↗"
                    note="Excluding cancelled orders"
                  />
                </div>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">LATEST ACTIVITY</p>
                      <h3>Recent orders</h3>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setActivePage("orders")}
                    >
                      VIEW ALL ↗
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <EmptyState message="No orders have been received yet." />
                  ) : (
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>ORDER</th>
                            <th>CUSTOMER</th>
                            <th>DATE</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((order) => (
                            <tr key={order._id}>
                              <td className="id-cell">
                                #{order._id.slice(-7).toUpperCase()}
                              </td>
                              <td>{order.customerName}</td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td>{money(order.totalAmount)}</td>
                              <td>
                                <StatusBadge status={order.status} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </section>
            )}

            {activePage === "products" && (
              <section className="page-section">
                <div className="welcome-row">
                  <div>
                    <p className="eyebrow">CATALOG MANAGEMENT</p>
                    <h1>Your products</h1>
                    <p>Manage your store's product collection.</p>
                  </div>
                  <button
                    className="primary-button"
                    onClick={openAddProduct}
                  >
                    + ADD PRODUCT
                  </button>
                </div>

                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h3>All products</h3>
                      <p>{products.length} products in your catalog</p>
                    </div>
                  </div>

                  {products.length === 0 ? (
                    <EmptyState message="No products found. Add your first product." />
                  ) : (
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>PRODUCT</th>
                            <th>SERIAL NO.</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            <th>STOCK</th>
                            <th>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product._id}>
                              <td>
                                <div className="product-table-info">
                                  <img
                                    src={
                                      product.images?.[0] ||
                                      product.image ||
                                      "https://placehold.co/80x80/edf0f5/64748b?text=Product"
                                    }
                                    alt={product.name}
                                  />
                                  <strong>{product.name}</strong>
                                </div>
                              </td>
                              <td>{product.serialNumber}</td>
                              <td>{product.category || "General"}</td>
                              <td>{money(product.price)}</td>
                              <td>{product.stock ?? 0}</td>
                              <td>
                                <div className="action-buttons">
                                  <button
                                    className="edit-button"
                                    onClick={() => openEditProduct(product)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="delete-button"
                                    onClick={() => deleteProduct(product._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </section>
            )}

            {activePage === "orders" && (
              <section className="page-section">
                <div className="welcome-row">
                  <div>
                    <p className="eyebrow">SALES MANAGEMENT</p>
                    <h1>Customer orders</h1>
                    <p>Review orders and manage their progress.</p>
                  </div>
                  <div className="order-count">
                    {orders.length} TOTAL ORDERS
                  </div>
                </div>

                <section className="panel">
                  {orders.length === 0 ? (
                    <EmptyState message="No customer orders have been received yet." />
                  ) : (
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>ORDER</th>
                            <th>CUSTOMER</th>
                            <th>PHONE</th>
                            <th>ITEMS</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td>
                                <strong className="id-cell">
                                  #{order._id.slice(-7).toUpperCase()}
                                </strong>
                                <span className="table-subtext">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td>
                                <strong>{order.customerName}</strong>
                                <span className="table-subtext">
                                  {order.address}
                                </span>
                              </td>
                              <td>{order.phone}</td>
                              <td>
                                {order.items?.reduce(
                                  (sum, item) => sum + item.quantity,
                                  0
                                ) || 0}{" "}
                                items
                              </td>
                              <td>{money(order.totalAmount)}</td>
                              <td>
                                <select
                                  className="status-select"
                                  value={order.status}
                                  onChange={(event) =>
                                    updateOrderStatus(
                                      order._id,
                                      event.target.value
                                    )
                                  }
                                >
                                  {[
                                    "Pending",
                                    "Confirmed",
                                    "Processing",
                                    "Shipped",
                                    "Delivered",
                                    "Cancelled",
                                  ].map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </section>
            )}
          </>
        )}
      </main>

      {showProductForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowProductForm(false);
            }
          }}
        >
          <section className="product-modal">
            <div className="modal-heading">
              <div>
                <p className="eyebrow">CATALOG MANAGEMENT</p>
                <h2>{editingProduct ? "Edit product" : "Add new product"}</h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowProductForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={saveProduct}>
              <div className="form-grid">
                <div className="form-field full-field">
                  <label>PRODUCT NAME</label>
                  <input
                    name="name"
                    value={productForm.name}
                    onChange={handleProductInput}
                    placeholder="e.g. Wireless Headphones"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>SERIAL NUMBER</label>
                  <input
                    name="serialNumber"
                    type="number"
                    value={productForm.serialNumber}
                    onChange={handleProductInput}
                    placeholder="e.g. 1001"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>PRICE (PKR)</label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={productForm.price}
                    onChange={handleProductInput}
                    placeholder="e.g. 70000"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>CATEGORY</label>
                  <input
                    name="category"
                    value={productForm.category}
                    onChange={handleProductInput}
                    placeholder="e.g. Audio"
                  />
                </div>

                <div className="form-field">
                  <label>STOCK QUANTITY</label>
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={productForm.stock}
                    onChange={handleProductInput}
                    placeholder="e.g. 10"
                  />
                </div>

                <div className="form-field full-field">
                  <label>DESCRIPTION</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={productForm.description}
                    onChange={handleProductInput}
                    placeholder="Describe the product..."
                  />
                </div>

                <div className="form-field full-field">
                  <label>
                    PRODUCT IMAGES {editingProduct ? "(OPTIONAL)" : "(3 REQUIRED)"}
                  </label>
                  <div className="upload-box">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                    <strong>Choose three product images</strong>
                    <span>
                      {editingProduct
                        ? "Leave empty to keep the current images."
                        : "Select exactly 3 images. Maximum 5 MB per image."}
                    </span>
                    {productImages.length > 0 && (
                      <span className="selected-files">
                        {productImages.length} of 3 images selected
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowProductForm(false)}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="primary-button"
                  disabled={savingProduct}
                >
                  {savingProduct
                    ? "SAVING..."
                    : editingProduct
                      ? "SAVE CHANGES"
                      : "CREATE PRODUCT"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, note }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function StatusBadge({ status }) {
  const className = `status-badge status-${(status || "pending").toLowerCase()}`;

  return <span className={className}>{status || "Pending"}</span>;
}

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <span>◇</span>
      <p>{message}</p>
    </div>
  );
}

export default App;
