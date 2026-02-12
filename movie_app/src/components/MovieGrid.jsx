import { AnimatePresence, motion } from 'framer-motion'
import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies, favorites, onToggleFavorite, isLoading }) {
  const MotionDiv = motion.div
  const list = isLoading ? new Array(8).fill(null) : movies

  return (
    <div id="grid" className="grid" aria-label="Movie grid">
      <AnimatePresence mode="popLayout">
        {list.map((m, index) => {
          const key = isLoading ? `sk-${index}` : m.id
          return (
            <MotionDiv
              key={key}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.24,
                ease: [0.2, 0.9, 0.2, 1],
                delay: Math.min(index, 10) * 0.03,
              }}
            >
              <MovieCard
                loading={isLoading}
                movie={m}
                isFavorite={!isLoading && favorites.has(m.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </MotionDiv>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
