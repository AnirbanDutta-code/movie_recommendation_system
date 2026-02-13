import { useEffect, useMemo, useState } from "react";
import HamburgerMenu from "./HamburgerMenu.jsx";
import SearchBar from "./SearchBar.jsx";
import { parseAnimateLayoutArgs } from "framer-motion";
import searchIcon from "../../resources/search.svg";
import movieIcon from "../../resources/movie.svg";


const NAV = [
  { key: "home", label: "Home" },
  { key: "trending", label: "Trending" },
  { key: "categories", label: "Categories" },
  { key: "top", label: "Top Rated" },
  { key: "favorites", label: "Favorites" },
];

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export var sim_movies_list = [];

//  all handleFetchRecommendation functions are defined here
async function get_recomendation(name) {
  if (!name?.trim()) {
    return { message: "Please enter a movie name" };
  }

  try {
    const tmdb_movies = await fetch_movies(name);
    let recommendations = [];

    try {
      const sim_res = await fetch(
        "http://127.0.0.1:8000/get_recommendations?movie_name=" + name,
      );
      const sim_data = await sim_res.json();
      if (sim_res.ok) {
        recommendations = Array.isArray(sim_data?.recommendations)
          ? sim_data.recommendations
          : [];
      }
    } catch (simError) {
      console.error("Recommendation API error:", simError);
    }

    console.log(recommendations, tmdb_movies);
    return (
      [tmdb_movies, recommendations] || {
        message: "No movies found error in fetch_movies",
      }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { message: "Error fetching movies" };
  }
}

async function fetch_movies(name) {
  try {
    const movie_details = {};
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)

    if (!data?.results?.length) {
      return { message: "No movies found" };
    }

    movie_details.id = data.results[0].id;
    movie_details.title = data.results[0].title;
    movie_details.description = data.results[0].overview;
    movie_details.year = data.results[0].release_date
      ? parseInt(data.results[0].release_date.split("-")[0])
      : "N/A";
    movie_details.rating = data.results[0].vote_average || "N/A";
    movie_details.categories = data.results[0].genre_ids?.map(String) || [
      "Movie",
    ];
    movie_details.poster = data.results[0].poster_path
      ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
      : "https://via.placeholder.com/800x1200";
    movie_details.backdrop = data.results[0].backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${data.results[0].backdrop_path}`
      : movie_details.poster;

    return (
      movie_details || { message: "No movies found error in fetch_movies" }
    );
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { message: "Error fetching movies" };
  }
}

// End of fetch movies

export default function Navbar({
  activeView,
  onSelectView,
  search,
  onSearchChange,
  onClearSearch,
  onSearch,
  onMovieFetched,
  recommenedMovieDetails,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [sim_movies, setsimMovies] = useState(["nothing"])
  // const [tmdb_movies, setTmdbMovies] = useState(["nothing"])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const pills = useMemo(() => NAV, []);

  const handleSelect = (key) => {
    onSelectView(key);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function get_recommended_movies_details(names) {
    const tmdb_recommendations_movies_list = [];
    if (!Array.isArray(names) || names.length === 0) {
      return tmdb_recommendations_movies_list;
    }
    for (let index = 0; index < names.length; index++) {
      const details = await fetch_movies(names[index]);
      // console.log("done")
      tmdb_recommendations_movies_list.push(details);
    }
    return tmdb_recommendations_movies_list;
  }

  const handleFetchRecommendation = async () => {
    const [tmdb_movies, sim_movies_list] = await get_recomendation(search);
    const recommded_movies_detail = await get_recommended_movies_details(sim_movies_list);
    // console.log(sim_movies_list);
    if (tmdb_movies && !tmdb_movies.message && onMovieFetched) {
      onMovieFetched(tmdb_movies);
      recommenedMovieDetails(recommded_movies_detail);
      console.log(recommded_movies_detail)
    }
  };

  return (
    <header className="nav">
      <div className="container">
        <div className="navInner">
          <div className="brand" role="banner" aria-label="CinePulse">
            <div className="brandMark" aria-hidden="true">
              <img className="brandMarkIcon" src={movieIcon} alt="" />
            </div>
            <div>
              <div className="brandTitle">MovieWorld</div>
              {/* <div className="brandSubtitle">Cinematic recommendations</div> */}
            </div>
          </div>

          <nav className="navLinks" aria-label="Primary">
            {pills.map((item) => (
              <button
                key={item.key}
                className={
                  item.key === activeView ? "navPill navPillActive" : "navPill"
                }
                onClick={() => handleSelect(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="rightCluster">
            <SearchBar
              value={search}
              onChange={onSearchChange}
              onClear={onClearSearch}
              onSearch={onSearch}
            />
            <button
              className="searchButton"
              onClick={handleFetchRecommendation}
              aria-label="Search recommendations"
            >
              <img className="searchButtonIcon" src={searchIcon} alt="" aria-hidden="true" />
            </button>
            <HamburgerMenu
              isOpen={isOpen}
              onToggle={() => setIsOpen((v) => !v)}
              activeView={activeView}
              onSelect={handleSelect}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
