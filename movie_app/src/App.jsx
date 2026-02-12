import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import CategoryFilter from "./components/CategoryFilter.jsx";
import Hero from "./components/Hero.jsx";
import MovieGrid from "./components/MovieGrid.jsx";
import Navbar from "./components/Navbar.jsx";
import SortOptions from "./components/SortOptions.jsx";

const allCategories = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
  "Adventure",
  "Crime",
  "Documentary",
  "Family",
  "Fantasy",
  "Mystery",
  "War",
  "Western",
];

const VIEW = {
  home: {
    title: "Curated Picks",
    note: "A cinematic blend of fresh and timeless.",
  },
  trending: {
    title: "Trending Now",
    note: "What everyone is watching tonight.",
  },
  categories: { title: "Browse Categories", note: "Filter by mood and genre." },
  top: { title: "Top Rated", note: "Critically adored and audience-approved." },
  favorites: { title: "Your Favorites", note: "Saved for the perfect night." },
};

function normalize(text) {
  return (text || "").toString().trim().toLowerCase();
}

function sortMovies(list, sortKey) {
  const copy = [...list];

  if (sortKey === "year") {
    copy.sort((a, b) => b.year - a.year);
    return copy;
  }

  if (sortKey === "az") {
    copy.sort((a, b) => a.title.localeCompare(b.title));
    return copy;
  }

  // Default: rating
  copy.sort((a, b) => b.rating - a.rating);
  return copy;
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const MotionPage = motion.div;

  const [activeView, setActiveView] = useState("home");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("rating");
  const [isLoading, setIsLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [heroMovie, setHeroMovie] = useState(null);
  const [recommedMovies, setRecommedMovies] = useState(null);

  const handleRecommendedMovies = (list) => {
    const nextMovies = Array.isArray(list) ? list : [];
    setRecommedMovies(nextMovies);
    setAllMovies(nextMovies);
  };

  // Favorites: stored in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("cinepulse:favorites");
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  });

  // Initial load of movies
  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Load placeholder/local movies - no external API calls
        setAllMovies([]);
        setFilteredMovies([]);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialMovies();
  }, []);

  // Store favorites in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "cinepulse:favorites",
        JSON.stringify([...favorites]),
      );
    } catch {
      // ignore
    }
  }, [favorites]);

  const base = useMemo(() => {
    if (activeView === "trending") return allMovies.filter((m) => m.trending);
    if (activeView === "top") return allMovies.filter((m) => m.rating >= 7);
    if (activeView === "favorites")
      return allMovies.filter((m) => favorites.has(m.id));
    return allMovies;
  }, [activeView, favorites, allMovies]);

  const filtered = useMemo(() => {
    const q = normalize(search);
    return base.filter((m) => {
      const matchesCategory =
        activeCategory === "All" || m.categories.includes(activeCategory);

      if (!matchesCategory) return false;

      if (!q) return true;

      const haystack = normalize(
        [m.title, m.tagline, m.description, m.categories.join(" ")].join(" "),
      );
      return haystack.includes(q);
    });
  }, [base, search, activeCategory]);

  const movies = useMemo(
    () => sortMovies(filtered, sortKey),
    [filtered, sortKey],
  );

  const featured = useMemo(() => {
    const pickFrom = movies.length ? movies : allMovies;
    const sorted = sortMovies(pickFrom, "rating");
    return (
      sorted[0] || {
        id: "default",
        title: "Loading...",
        description: "Discover your next favorite movie",
        year: 2024,
        rating: 0,
        categories: [],
        poster: "https://via.placeholder.com/800x1200",
        backdrop: "https://via.placeholder.com/2000x1200",
      }
    );
  }, [movies, allMovies]);

  const title = VIEW[activeView]?.title || "Discover";
  const note = VIEW[activeView]?.note || "Find your next favorite.";

  const onToggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onExplore = () => {
    const el = document.getElementById("grid");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionPage
      className="app"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <div className="topGlow" aria-hidden="true" />

      <Navbar
        activeView={activeView}
        onSelectView={setActiveView}
        search={search}
        onSearchChange={setSearch}
        onClearSearch={() => setSearch("")}
        onMovieFetched={setHeroMovie}
        recommenedMovieDetails={handleRecommendedMovies}
      />

      <Hero movie={heroMovie || featured} onExplore={onExplore} />
      <main className="section" aria-label="Movies">
        <div className="container">
          <div className="toolbar">
            <div className="toolbarRow">
              <div>
                <h2 className="sectionTitle">{title}</h2>
                <div className="subtle">
                  {note} · {movies.length} result
                  {movies.length === 1 ? "" : "s"}
                </div>
              </div>
            </div>

            <div className="toolbarRow">
              <CategoryFilter
                categories={allCategories}
                active={activeCategory}
                onChange={setActiveCategory}
              />
              <SortOptions sortKey={sortKey} onChange={setSortKey} />
            </div>
          </div>

          {error && <div className="empty">Error: {error}</div>}

          {movies.length === 0 && !isLoading && !error ? (
            <div className="empty">
              No movies match your filters. Try a different category or search.
            </div>
          ) : (
            <MovieGrid
              movies={recommedMovies}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </MotionPage>
  );
}
