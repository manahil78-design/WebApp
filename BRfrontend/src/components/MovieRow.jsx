
import "./MovieRow.css";

function MovieRow({ title, movies, onSelect, onWatch }) {
  if (movies.length === 0) {
    return (
      <section className="cine-movie-section">
        <h2>{title}</h2>
        <p className="cine-empty-row">No movies to show here yet.</p>
      </section>
    );
  }

  return (
    <section className="cine-movie-section">
      <div className="cine-row-heading">
        <div>
          <span className="cine-row-accent"></span>
          <h2>{title}</h2>
        </div>

        <span className="cine-row-count">
          {movies.length} titles
        </span>
      </div>

      <div className="cine-movie-grid">
        {movies.map((movie) => (
          <article className="cine-movie-card" key={movie.id}>
            <button
              className="cine-poster-button"
              type="button"
              onClick={() => onSelect(movie)}
              aria-label={`View ${movie.title}`}
            >
              <img
                className="cine-poster"
                src={movie.poster}
                alt={`${movie.title} poster`}
                loading="lazy"
              />

              <span className="cine-poster-overlay"></span>
              <span className="cine-poster-play">▶</span>
              <span className="cine-poster-quality">HD</span>
            </button>

            <div className="cine-card-info">
              <div className="cine-card-title-line">
                <h3>{movie.title}</h3>
                <span className="cine-card-rating">
                  ★ {movie.rating}
                </span>
              </div>

              <p>{movie.year} <span>•</span> {movie.genre}</p>

              <button
                className="cine-card-watch"
                type="button"
                onClick={() => onWatch(movie)}
              >
                ▶ Watch
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;
