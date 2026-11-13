
import "./Hero.css";

function Hero({ movie, isSaved, onToggleList, onWatch }) {
  return (
    <section
      className="cine-hero"
      style={{ "--hero-image": `url("${movie.image}")` }}
    >
      <div className="cine-hero-shade"></div>

      <div className="cine-hero-content">
        <div className="cine-series-label">
          <span className="cine-n-mark">C</span>
          <span>FEATURED FILM</span>
        </div>

        <p className="cine-hero-kicker">YOUR NEXT MOVIE NIGHT</p>

        <h1>{movie.title}</h1>

        <div className="cine-movie-meta">
          <span>{movie.year}</span>
          <span className="cine-meta-badge">16+</span>
          <span>{movie.genre}</span>
          <span>{movie.duration}</span>
          <span className="cine-meta-badge">HD</span>
        </div>

        <p className="cine-hero-description">{movie.description}</p>

        <div className="cine-hero-buttons">
          <button
            className="cine-watch-button"
            onClick={() => onWatch(movie)}
          >
            <span>▶</span> Watch Now
          </button>

          <button
            className={`cine-list-button ${isSaved ? "saved" : ""}`}
            onClick={() => onToggleList(movie)}
          >
            <span>{isSaved ? "✓" : "+"}</span>
            {isSaved ? "In My List" : "My List"}
          </button>
        </div>

        <div className="cine-hero-rating">
          <span className="cine-rating-star">★</span>
          <strong>{movie.rating}</strong>
          <span>IMDb-style rating</span>
          <span className="cine-rating-divider">|</span>
          <span>Editor's Pick</span>
        </div>
      </div>

      <div className="cine-hero-caption">
        <span className="cine-caption-line"></span>
        <span>NOW SHOWING ON CINEJOY</span>
      </div>
    </section>
  );
}

export default Hero;
