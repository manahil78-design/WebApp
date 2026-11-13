
import { useState } from "react";
import "./App.css";

const image = (path, size = "w500") =>
  `https://image.tmdb.org/t/p/${size}/${path}`;

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    year: 2021,
    genre: "Marvel",
    rating: "8.2",
    poster: image("1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"),
    backdrop: image("zD5v1E4joAzFvmAEytt7fM3ivyT.jpg", "original"),
    description:
      "With his identity revealed, Peter Parker turns to Doctor Strange. But changing reality comes with a price.",
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    year: 2019,
    genre: "Marvel",
    rating: "8.4",
    poster: image("or06FN3Dka5tukK1e9sl16pB3iy.jpg"),
    description: "The Avengers face their greatest challenge in a battle for the future.",
  },
  {
    id: 3,
    title: "Black Panther",
    year: 2018,
    genre: "Marvel",
    rating: "7.3",
    poster: image("uxzzxijgPIY7slzFvMotPv8wjKA.jpg"),
    description: "A new king must protect his nation and discover what it means to lead.",
  },
  {
    id: 4,
    title: "Doctor Strange",
    year: 2016,
    genre: "Marvel",
    rating: "7.5",
    poster: image("uGBVj3bEbCoZbDjjl9wTxcygko1.jpg"),
    description: "A brilliant surgeon discovers a hidden world of mystical possibilities.",
  },
  {
    id: 5,
    title: "Guardians of the Galaxy",
    year: 2014,
    genre: "Marvel",
    rating: "8.0",
    poster: image("r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg"),
    description: "An unlikely team of heroes takes on an adventure across the galaxy.",
  },
  {
    id: 6,
    title: "Iron Man",
    year: 2008,
    genre: "Marvel",
    rating: "7.9",
    poster: image("78lPtwv72eTNqFW9COBYI0dWDJa.jpg"),
    description: "A genius inventor builds a suit that changes his life forever.",
  },
  {
    id: 7,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: "Animation",
    rating: "8.6",
    poster: image("8Vt6mWEReuy4Of61Lnj5Xj888t2.jpg"),
    description: "Miles Morales journeys through extraordinary alternate universes.",
  },
  {
    id: 8,
    title: "The Batman",
    year: 2022,
    genre: "Action",
    rating: "7.8",
    poster: image("74xTEgt7R36Fpooo50r9T25onhq.jpg"),
    description: "A dark detective story set in a city full of secrets.",
  },
];

const categories = ["All", "Marvel", "Animation", "Action"];

export default function App() {
  const [featured, setFeatured] = useState(movies[0]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("Home");
  const [myList, setMyList] = useState([]);
  const [message, setMessage] = useState("");

  const saved = myList.some((movie) => movie.id === featured.id);

  const filtered = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase()) ||
      String(movie.year).includes(search);

    const matchesCategory =
      category === "All" || movie.genre === category;

    const matchesPage =
      page !== "My List" ||
      myList.some((item) => item.id === movie.id);

    return matchesSearch && matchesCategory && matchesPage;
  });

  function toggleSaved(movie) {
    if (myList.some((item) => item.id === movie.id)) {
      setMyList((list) => list.filter((item) => item.id !== movie.id));
      setMessage("Removed from My List");
    } else {
      setMyList((list) => [...list, movie]);
      setMessage("Added to My List");
    }
  }

  function choosePage(nextPage) {
    setPage(nextPage);
    setSearch("");
    setCategory("All");
    setMessage("");
  }

  function chooseMovie(movie) {
    setFeatured(movie);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="noir">
      <header className="topbar">
        <button className="logo" onClick={() => choosePage("Home")}>
          NOIR<span>.</span>
        </button>

        <nav>
          {["Home", "Movies", "My List"].map((item) => (
            <button
              key={item}
              className={page === item ? "nav-item selected" : "nav-item"}
              onClick={() => choosePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <input
          className="search"
          placeholder="Search movies..."
          aria-label="Search movies"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </header>

      {page === "Home" && !search && (
        <section className="hero">
          <img
            className="hero-image"
            src={featured.backdrop || featured.poster}
            alt=""
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow">THE NOIR FEATURE</p>
            <p className="hero-label">MARVEL STUDIOS PRESENTS</p>
            <h1>{featured.title}</h1>

            <div className="metadata">
              <span className="rating">★ {featured.rating}</span>
              <span>{featured.year}</span>
              <span>{featured.genre}</span>
            </div>

            <p className="description">{featured.description}</p>

            <div className="hero-buttons">
              <button
                className="watch-button"
                onClick={() =>
                  setMessage("This demo does not have video playback yet.")
                }
              >
                ▶ &nbsp; Watch now
              </button>

              <button
                className="list-button"
                onClick={() => toggleSaved(featured)}
              >
                {saved ? "✓ In My List" : "+ My List"}
              </button>
            </div>
          </div>

          <div className="hero-caption">YOUR NEXT MARVEL MOMENT</div>
        </section>
      )}

      <main className="content">
        <div className="heading">
          <div>
            <p className="eyebrow">
              {page === "My List" ? "YOUR COLLECTION" : "HANDPICKED FOR YOU"}
            </p>
            <h2>
              {page === "My List"
                ? "My List"
                : search
                  ? "Search results"
                  : page === "Movies"
                    ? "Explore movies"
                    : "Marvel & More"}
            </h2>
          </div>
          <span className="count">{filtered.length} TITLES</span>
        </div>

        {page !== "My List" && (
          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "filter active" : "filter"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {message && (
          <div className="message">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}

        {filtered.length ? (
          <div className="movie-grid">
            {filtered.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <button
                  className="poster-wrap"
                  onClick={() => chooseMovie(movie)}
                  aria-label={`Feature ${movie.title}`}
                >
                  <img
                    className="poster"
                    src={movie.poster}
                    alt={movie.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.parentElement.classList.add(
                        "poster-missing"
                      );
                    }}
                  />
                  <span className="poster-fallback">{movie.title}</span>
                  <span className="play">▶</span>
                </button>

                <div className="movie-info">
                  <button
                    className="movie-title"
                    onClick={() => chooseMovie(movie)}
                  >
                    {movie.title}
                  </button>
                  <p>{movie.year} <span>·</span> {movie.genre}</p>
                </div>

                <button
                  className="save-button"
                  onClick={() => toggleSaved(movie)}
                  aria-label={`Save ${movie.title}`}
                >
                  {myList.some((item) => item.id === movie.id) ? "✓" : "+"}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>Nothing here just yet.</h3>
            <p>Try another search or add a movie to your list.</p>
            <button
              className="list-button"
              onClick={() => choosePage("Home")}
            >
              Explore movies
            </button>
          </div>
        )}

        <footer className="footer">
          <button className="logo" onClick={() => choosePage("Home")}>
            NOIR<span>.</span>
          </button>
          <p>MADE FOR THE LOVE OF CINEMA.</p>
        </footer>
      </main>
    </div>
  );
}