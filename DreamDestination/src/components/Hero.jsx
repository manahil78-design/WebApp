import "./Hero.css";

const travelTypes = [
  "All Types",
  "Beach",
  "Adventure",
  "Culture",
  "Nature",
  "City Break",
  "Romance",
];

function Hero({ search, setSearch, travelType, setTravelType }) {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            FIND YOUR NEXT SOMEWHERE
          </p>

          <h1>
            The world is
            <br />
            waiting for <em>you.</em>
          </h1>

          <p className="hero-description">
            Discover extraordinary places, thoughtfully curated
            experiences, and journeys you'll remember forever.
          </p>

          <form
            className="search-bar"
            onSubmit={(event) => {
              event.preventDefault();
              document
                .getElementById("destinations")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Where do you dream of going?"
                aria-label="Search destinations"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="type-field">
              <span className="sr-only">Travel type</span>
              <select
                value={travelType}
                onChange={(event) => setTravelType(event.target.value)}
                aria-label="Filter by travel type"
              >
                {travelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <button className="search-submit" type="submit" aria-label="Find destinations">
              →
            </button>
          </form>

          <a className="hero-link" href="#destinations">
            <span className="play-icon">↘</span>
            <span>Explore the extraordinary</span>
            <span className="hero-link-line" />
          </a>
        </div>

        <div className="hero-caption">
          <span>01 / THE ART OF GETTING LOST</span>
          <span>YOUR NEXT CHAPTER STARTS HERE</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;