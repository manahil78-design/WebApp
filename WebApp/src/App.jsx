import React, { useState } from "react";
import AppForm from "./components/AppForm";
import AppList from "./components/AppList";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setRefreshTrigger((previous) => previous + 1);
  };

  return (
    <div className="dashboard" id="top">
      <header className="top-navbar">
        <a href="#top" className="nav-brand">
          <div className="brand-logo">A</div>
          <div>
            <h2>APPLIST</h2>
            <span>INVENTORY STUDIO</span>
          </div>
        </a>

        <nav className="nav-links">
          <a className="nav-active" href="#top">Dashboard</a>
          <a href="#products">Products</a>
          <a href="#inventory">Inventory</a>
        </nav>

        <div className="nav-profile">
          <div className="profile-avatar">A</div>
          <span>Admin</span>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="hero-banner">
          <div className="hero-copy">
            <span className="hero-kicker">YOUR WORKSPACE</span>
            <h1>Inventory Dashboard</h1>
            <p>Smart inventory. Smarter decisions.</p>
            <a href="#inventory" className="hero-button">
              Explore inventory <span>↗</span>
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>
            <div className="hero-cube">A</div>
            <div className="hero-spark spark-one">✦</div>
            <div className="hero-spark spark-two">✧</div>
          </div>
        </section>

        <AppForm onProductAdded={handleProductAdded} />

        <AppList refreshTrigger={refreshTrigger} />

        <footer className="dashboard-footer">
          <span>APPLIST INVENTORY STUDIO</span>
          <span>Designed for smarter product management.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;