import "./DestinationCards.css";

const destinations = [
  {
    id: 1,
    name: "Amalfi Coast",
    country: "Italy",
    type: "Romance",
    category: "Beach",
    price: "$1,300",
    duration: "7 days",
    description: "Coastal villages, turquoise seas and slow Italian afternoons.",
    image:
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    type: "Beach",
    category: "Beach",
    price: "$1,200",
    duration: "6 days",
    description: "Tropical shores, peaceful temples and lush green escapes.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    type: "Adventure",
    category: "Adventure",
    price: "$1,450",
    duration: "8 days",
    description: "Mountain air, alpine lakes and spectacular hiking trails.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Kyoto",
    country: "Japan",
    type: "Culture",
    category: "Culture",
    price: "$1,100",
    duration: "5 days",
    description: "Traditional streets, tranquil gardens and timeless charm.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    type: "Romance",
    category: "Beach",
    price: "$1,500",
    duration: "6 days",
    description: "Whitewashed homes, blue domes and unforgettable sunsets.",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Lake Como",
    country: "Italy",
    type: "Nature",
    category: "Nature",
    price: "$1,250",
    duration: "5 days",
    description: "Serene water, mountain views and lakeside hideaways.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Marrakech",
    country: "Morocco",
    type: "Culture",
    category: "Culture",
    price: "$950",
    duration: "4 days",
    description: "Colorful souks, courtyard riads and fragrant food markets.",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "New York",
    country: "United States",
    type: "City Break",
    category: "City Break",
    price: "$1,400",
    duration: "5 days",
    description: "Skyline views, creative neighborhoods and city energy.",
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?auto=format&fit=crop&w=900&q=85",
  },
];

const filters = ["All Types", "Beach", "Adventure", "Culture", "Nature", "City Break"];

function DestinationCards({
  search,
  travelType,
  favorites,
  toggleFavorite,
  showFavoritesOnly,
  setTravelType,
}) {
  const filteredDestinations = destinations.filter((destination) => {
    const searchText =
      `${destination.name} ${destination.country} ${destination.type}`.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesType =
      travelType === "All Types" ||
      destination.category === travelType ||
      destination.type === travelType;

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(destination.id);

    return matchesSearch && matchesType && matchesFavorites;
  });

  return (
    <section className="destinations-section" id="destinations">
      <div className="section-heading">
        <div>
          <p className="eyebrow section-eyebrow">
            {showFavoritesOnly ? "YOUR PERSONAL COLLECTION" : "CURATED FOR YOU"}
          </p>

          <h2>
            {showFavoritesOnly ? (
              <>Places you <em>love.</em></>
            ) : (
              <>Somewhere <em>extraordinary.</em></>
            )}
          </h2>

          <p className="section-description">
            {showFavoritesOnly
              ? "All your saved escapes, gathered in one place."
              : "Thoughtful escapes for curious souls and open hearts."}
          </p>
        </div>

        <span className="destination-count">
          {filteredDestinations.length.toString().padStart(2, "0")} PLACES
        </span>
      </div>

      <div className="filter-row" id="travel-types" aria-label="Filter destinations">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-chip ${travelType === filter ? "selected" : ""}`}
            onClick={() => setTravelType(filter)}
            aria-pressed={travelType === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="destination-grid">
          {filteredDestinations.map((destination, index) => {
            const isFavorite = favorites.includes(destination.id);

            return (
              <article
                className="destination-card"
                key={destination.id}
                style={{ "--card-delay": `${index * 70}ms` }}
              >
                <div className="destination-image-wrap">
                  <img
                    className="destination-image"
                    src={destination.image}
                    alt={`${destination.name}, ${destination.country}`}
                    loading="lazy"
                  />

                  <span className="destination-tag">{destination.category}</span>

                  <button
                    className={`heart-button ${isFavorite ? "is-favorite" : ""}`}
                    onClick={() => toggleFavorite(destination.id)}
                    aria-label={
                      isFavorite
                        ? `Remove ${destination.name} from favorites`
                        : `Save ${destination.name} to favorites`
                    }
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>

                  <div className="image-gradient" />
                  <div className="image-title">
                    <p>{destination.country}</p>
                    <h3>{destination.name}</h3>
                  </div>
                </div>

                <div className="destination-details">
                  <p className="destination-description">
                    {destination.description}
                  </p>

                  <div className="destination-meta">
                    <span>◷ {destination.duration}</span>
                    <span className="destination-price">
                      From <strong>{destination.price}</strong>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <span>⌕</span>
          <h3>No destinations found just yet.</h3>
          <p>Try another search, choose a different travel type, or explore all places.</p>
          <button
            className="reset-button"
            onClick={() => {
              setTravelType("All Types");
              if (showFavoritesOnly) {
                // The saved view can be turned off from the header.
              }
            }}
          >
            Show all travel types
          </button>
        </div>
      )}

      <div className="collection-note">
        <span className="note-icon">✳</span>
        <p>
          <strong>Your kind of somewhere.</strong>
          <br />
          Save the places that speak to you. Your next story starts with a dream.
        </p>
      </div>
    </section>
  );
}

export default DestinationCards;