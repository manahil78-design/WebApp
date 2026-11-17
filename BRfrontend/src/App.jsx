
import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PropertySearch from "./components/PropertySearch";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
import "./App.css";

const properties = [
  {
    id: 1,
    title: "Contemporary Luxury Villa",
    location: "DHA Phase 6, Lahore",
    price: 48500000,
    type: "House",
    purpose: "Buy",
    beds: 5,
    baths: 6,
    area: "1 Kanal",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1100&q=85",
    tag: "FEATURED",
  },
  {
    id: 2,
    title: "Modern Minimalist Residence",
    location: "F-7, Islamabad",
    price: 320000,
    type: "House",
    purpose: "Rent",
    beds: 4,
    baths: 4,
    area: "10 Marla",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85",
    tag: "NEW",
  },
  {
    id: 3,
    title: "The Grand City Apartment",
    location: "Clifton, Karachi",
    price: 28500000,
    type: "Apartment",
    purpose: "Buy",
    beds: 3,
    baths: 3,
    area: "2,100 sqft",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85",
    tag: "POPULAR",
  },
  {
    id: 4,
    title: "Serene Garden House",
    location: "Bahria Town, Islamabad",
    price: 195000,
    type: "House",
    purpose: "Rent",
    beds: 4,
    baths: 3,
    area: "10 Marla",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85",
    tag: "",
  },
  {
    id: 5,
    title: "Elegant Penthouse Suite",
    location: "DHA Phase 8, Karachi",
    price: 62000000,
    type: "Apartment",
    purpose: "Buy",
    beds: 4,
    baths: 4,
    area: "3,000 sqft",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85",
    tag: "LUXURY",
  },
  {
    id: 6,
    title: "Modern Family Home",
    location: "DHA Phase 5, Lahore",
    price: 240000,
    type: "House",
    purpose: "Rent",
    beds: 3,
    baths: 3,
    area: "1 Kanal",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1100&q=85",
    tag: "NEW",
  },
  {
    id: 7,
    title: "The Urban Living Apartment",
    location: "E-11, Islamabad",
    price: 18500000,
    type: "Apartment",
    purpose: "Buy",
    beds: 2,
    baths: 2,
    area: "1,450 sqft",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1100&q=85",
    tag: "",
  },
  {
    id: 8,
    title: "Peaceful Contemporary Villa",
    location: "Bahria Town, Lahore",
    price: 375000,
    type: "House",
    purpose: "Rent",
    beds: 5,
    baths: 5,
    area: "1 Kanal",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=85",
    tag: "FEATURED",
  },
];

function App() {
  const [filters, setFilters] = useState({
    location: "",
    purpose: "Any",
    type: "Any",
    budget: "Any",
  });

  const [favorites, setFavorites] = useState([]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const locationMatch =
        property.location.toLowerCase().includes(filters.location.toLowerCase());

      const purposeMatch =
        filters.purpose === "Any" || property.purpose === filters.purpose;

      const typeMatch =
        filters.type === "Any" || property.type === filters.type;

      let budgetMatch = true;

      if (filters.budget !== "Any") {
        const maxBudget = Number(filters.budget);
        budgetMatch = property.price <= maxBudget;
      }

      return locationMatch && purposeMatch && typeMatch && budgetMatch;
    });
  }, [filters]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <div className="homehunt">
      <Header favoritesCount={favorites.length} />

      <main>
        <Hero />

        <PropertySearch
          filters={filters}
          setFilters={setFilters}
        />

        <PropertyGrid
          properties={filteredProperties}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
