function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 17.27 6.18 20.5l1.12-6.54L2.5 9.24l6.56-.95L12 2.5l2.94 5.79 6.56.95-4.8 4.72 1.12 6.54L12 17.27Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.8 8.3 3.1 5 6.7 5c1.9 0 3.4 1 4.3 2.2C12 6 13.5 5 15.3 5c3.6 0 5.9 3.3 4.3 6.8C19.5 16.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MovieCard({ movie, isFavorite, onToggleFavorite, loading = false }) {
  if (loading) {
    return (
      <article className="card skeleton" aria-label="Loading movie">
        <div className="poster" />
        <div className="cardBody">
          <div className="cardTop">
            <div className="skCol">
              <div className="skeletonBlock skeletonBlockLg skW70" />
              <div className="skeletonBlock skW55 skMt10" />
            </div>
            <div className="skeletonBlock skW66H28" />
          </div>
          <div className="skeletonBlock skW100 skMt14" />
          <div className="skeletonBlock skW92 skMt10" />
          <div className="skRow skMt14">
            <div className="skeletonBlock skW84H28" />
            <div className="skeletonBlock skW72H28" />
          </div>
        </div>
      </article>
    )
  }

  const genresLabel = Array.isArray(movie.categories) && movie.categories.length
    ? movie.categories.slice(0, 3).join(' • ')
    : 'Drama'

  return (
    <article className="card" aria-label={movie.title}>
      <div className="poster">
        <img className="posterImg" src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />
        <div className="posterShade" aria-hidden="true" />
        <button
          className={isFavorite ? 'favBtn favActive' : 'favBtn'}
          onClick={() => onToggleFavorite(movie.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon className="favIcon" />
        </button>
      </div>
      <div className="cardBody">
        <div className="cardTop">
          <div>
            <h3 className="movieTitle">{movie.title}</h3>
            <div className="subtle">{movie.year}</div>
          </div>
          <span className="rating" aria-label={`Rating ${movie.rating}`}>
            <StarIcon className="ratingStar" /> {movie.rating}
          </span>
        </div>
        <p className="movieDesc">{movie.description || "No description availabe"}</p>
        <div className="cardMeta">
          <span className="tag genresTag">{genresLabel}</span>
          <span className="tag statusTag">{movie.trending ? 'Trending' : 'Curated'}</span>
        </div>
      </div>
    </article>
  )
}
