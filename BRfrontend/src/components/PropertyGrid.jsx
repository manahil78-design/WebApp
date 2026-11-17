
import React from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyGrid.css";

function PropertyGrid({ properties, favorites, toggleFavorite }) {
  return (
    <section className="property-grid-section" id="properties">
      <div className="property-grid-heading">
        <div>
          <span className="grid-kicker">A PLACE FOR EVERY STORY</span>
          <h2>Explore our <em>properties.</em></h2>
          <p>Thoughtfully selected spaces waiting to be discovered.</p>
        </div>

        <div className="listing-count">
          <strong>{properties.length.toString().padStart(2, "0")}</strong>
          <span>AVAILABLE LISTINGS</span>
        </div>
      </div>

      {properties.length > 0 ? (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favorites.includes(property.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="no-properties">
          <span>⌕</span>
          <h3>No properties found</h3>
          <p>Try changing your search or filters to discover more homes.</p>
        </div>
      )}
    </section>
  );
}

export default PropertyGrid;
