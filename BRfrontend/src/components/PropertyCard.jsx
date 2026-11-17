
import React from "react";
import "./PropertyCard.css";

function formatPrice(price, purpose) {
  if (purpose === "Rent") {
    return `Rs. ${price.toLocaleString("en-PK")}`;
  }

  if (price >= 10000000) {
    return `Rs. ${(price / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }

  if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(1)} Lac`;
  }

  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function PropertyCard({ property, isFavorite, toggleFavorite }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img
          src={property.image}
          alt={property.title}
          className="property-image"
          loading="lazy"
        />

        {property.tag && (
          <span className="property-tag">{property.tag}</span>
        )}

        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => toggleFavorite(property.id)}
          aria-label={isFavorite ? "Remove from saved" : "Save property"}
          title={isFavorite ? "Remove from saved" : "Save property"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <span className="property-purpose">
          {property.purpose === "Buy" ? "FOR SALE" : "FOR RENT"}
        </span>
      </div>

      <div className="property-card-content">
        <div className="property-card-topline">
          <span>{property.type}</span>
          <span className="property-location">⌖ {property.location}</span>
        </div>

        <h3>{property.title}</h3>

        <div className="property-features">
          <span>▣ {property.beds} Beds</span>
          <span>♧ {property.baths} Baths</span>
          <span>▱ {property.area}</span>
        </div>

        <div className="property-card-bottom">
          <div>
            <small>{property.purpose === "Rent" ? "MONTHLY RENT" : "ASKING PRICE"}</small>
            <strong>{formatPrice(property.price, property.purpose)}</strong>
            {property.purpose === "Rent" && <small className="per-month">/ month</small>}
          </div>

          <button
            className="view-property-btn"
            onClick={() =>
              alert(`You selected: ${property.title}\n${property.location}`)
            }
          >
            View <span>↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
