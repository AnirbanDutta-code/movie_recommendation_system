import { AnimatePresence, motion } from 'framer-motion'

const MENU = [
  { key: 'home', label: 'Home' },
  { key: 'trending', label: 'Trending' },
  { key: 'categories', label: 'Categories' },
  { key: 'top', label: 'Top Rated' },
  { key: 'favorites', label: 'Favorites' },
]

export default function HamburgerMenu({ isOpen, onToggle, activeView, onSelect }) {
  const MotionDiv = motion.div
  const MotionAside = motion.aside
  const MotionButton = motion.button

  return (
    <>
      <button
        className={isOpen ? 'hamburger hamburgerOpen' : 'hamburger'}
        onClick={onToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span className="burgerLines" aria-hidden="true">
          <span className="burgerLine burgerLine1" />
          <span className="burgerLine burgerLine2" />
          <span className="burgerLine burgerLine3" />
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <>
            <MotionDiv
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
            />
            <MotionAside
              className="sidebar"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ type: 'tween', ease: [0.2, 0.9, 0.2, 1], duration: 0.28 }}
              role="dialog"
              aria-label="Navigation menu"
            >
              <div className="sidebarHeader">
                <div className="sidebarTitle">Menu</div>
                <button className="iconBtn" onClick={onToggle} aria-label="Close menu">
                  ✕
                </button>
              </div>

              <MotionDiv
                className="menuList"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
                  },
                }}
              >
                {MENU.map((item) => (
                  <MotionButton
                    key={item.key}
                    className={
                      item.key === activeView ? 'menuItem menuItemActive' : 'menuItem'
                    }
                    variants={{
                      hidden: { y: 8, opacity: 0 },
                      show: { y: 0, opacity: 1 },
                    }}
                    onClick={() => onSelect(item.key)}
                  >
                    {item.label}
                  </MotionButton>
                ))}
              </MotionDiv>

              <div className="footerNote">
                Tip: use Search + Sort to refine instantly.
              </div>
            </MotionAside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
