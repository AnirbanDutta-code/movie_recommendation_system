import { motion, useReducedMotion } from 'framer-motion'

export default function Hero({ movie, onExplore }) {
  const reduceMotion = useReducedMotion()
  const MotionDiv = motion.div

  // Handle default movie if not provided
  const displayMovie = movie || {
    title: 'Loading...',
    description: 'Discover your next favorite movie',
    year: 2024,
    rating: 0,
    categories: [],
    poster: 'https://via.placeholder.com/800x1200',
    backdrop: 'https://via.placeholder.com/2000x1200',
  }

  const heroImage = displayMovie.backdrop 
  const imageClassName = displayMovie.backdrop
    ? 'heroBackdropImg'
    : 'heroBackdropImg heroBackdropImgPoster'

  return (
    <section className="hero" aria-label="Featured movie">
      <div className="container">
        <MotionDiv
          className="heroCard"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
        >
          <div className="heroBackdrop" aria-hidden="true">
            <img
              className={imageClassName}
              src={heroImage}
              alt={displayMovie.title || 'Featured movie'}
            />
          </div>
          <div className="heroOverlay" aria-hidden="true" />

          <div className="heroInner">
            <div className="heroKicker">
              <span className="kickerDot" /> Featured
            </div>
            <h1 className="heroTitle">{displayMovie.title}</h1>
            <p className="heroTagline">{displayMovie.description || displayMovie.tagline}</p>

            <div className="heroMeta">
              <span className="badge">
                <span className="ratingDot" /> {displayMovie.rating} Rating
              </span>
              <span className="badge">{displayMovie.year}</span>
              <span className="badge">{Array.isArray(displayMovie.categories) ? displayMovie.categories[0] : displayMovie.categories}</span>
            </div>

            <div className="btnRow">
              <button className="btn btnPrimary" onClick={onExplore}>
                Explore Now
              </button>
              <a
                className="btn"
                href="#grid"
                onClick={(e) => {
                  e.preventDefault()
                  onExplore()
                }}
              >
                View Collection
              </a>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}
