
import React from "react";
import "./PropertySearch.css";

function PropertySearch({ filters, setFilters }) {
  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      purpose: "Any",
      type: "Any",
      budget: "Any",
    });
  };

  return (
    <section className="property-search-section">
      <div className="search-heading">
        <div>
          <span className="search-kicker">FIND YOUR PERFECT SPACE</span>
          <h2>Let's find your <em>place.</em></h2>
        </div>
        <button className="clear-filters" onClick={clearFilters}>
          Reset filters ↺
        </button>
      </div>

      <div className="property-search-box">
        <div className="search-field location-field">
          <label>LOCATION</label>
          <div className="search-input-wrap">
            <span>⌖</span>
            <input
              type="text"
              placeholder="City, area or neighbourhood"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
            />
          </div>
        </div>

        <div className="search-field">
          <label>PROPERTY STATUS</label>
          <select
            value={filters.purpose}
            onChange={(e) => updateFilter("purpose", e.target.value)}
          >
            <option value="Any">Buy or Rent</option>
            <option value="Buy">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>

        <div className="search-field">
          <label>PROPERTY TYPE</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
          >
            <option value="Any">All Properties</option>
            <option value="House">Houses</option>
            <option value="Apartment">Apartments</option>
          </select>
        </div>

        <div className="search-field">
          <label>MAXIMUM BUDGET</label>
          <select
            value={filters.budget}
            onChange={(e) => updateFilter("budget", e.target.value)}
          >
            <option value="Any">Any Budget</option>
            <option value="5000000">Up to Rs. 50 Lakh</option>
            <option value="15000000">Up to Rs. 1.5 Crore</option>
            <option value="30000000">Up to Rs. 3 Crore</option>
            <option value="50000000">Up to Rs. 5 Crore</option>
            <option value="100000000">Up to Rs. 10 Crore</option>
          </select>
        </div>

        <a href="#properties" className="search-submit">
          <span>⌕</span> Find Home
        </a>
      </div>
    </section>
  );
}

export default PropertySearch;
