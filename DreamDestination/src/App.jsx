import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import DestinationCards from "./components/DestinationCards";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [travelType, setTravelType] = useState("All Types");
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  function toggleFavorite(destinationId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(destinationId)) {
        return currentFavorites.filter((id) => id !== destinationId);
      }

      return [...currentFavorites, destinationId];
    });
  }

  return (
    <div className="app">
      <Header
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <main>
        <Hero
          search={search}
          setSearch={setSearch}
          travelType={travelType}
          setTravelType={setTravelType}
        />

        <DestinationCards
          search={search}
          travelType={travelType}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          showFavoritesOnly={showFavoritesOnly}
          setTravelType={setTravelType}
        />
      </main>

      <Footer />
    </div>
  );
}
export default App;