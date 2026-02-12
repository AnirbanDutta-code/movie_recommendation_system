import { AnimatePresence, motion } from 'framer-motion'
import { useMemo } from 'react'

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.25 16.25 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6 18 18M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}



export default function SearchBar({ value, onChange, onClear }) {
  const expanded = useMemo(() => (value || '').trim().length > 0, [value])
  const MotionButton = motion.button

  return (
    <div className={expanded ? 'searchWrap searchWrapExpanded' : 'searchWrap'}>
      <SearchIcon className="searchIcon" />
      <input
        className="searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies"
      />
      <AnimatePresence initial={false}>
        {(value || '').length > 0 ? (
          <MotionButton
            className="iconBtn"
            onClick={onClear}
            aria-label="Clear search"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <XIcon className="icon16" />
          </MotionButton>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
