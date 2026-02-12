import { useEffect, useMemo, useState } from 'react'
import HamburgerMenu from './HamburgerMenu.jsx'
import SearchBar from './SearchBar.jsx'
// import { useState } from 'react'

const NAV = [
  { key: 'home', label: 'Home' },
  { key: 'trending', label: 'Trending' },
  { key: 'categories', label: 'Categories' },
  { key: 'top', label: 'Top Rated' },
  { key: 'favorites', label: 'Favorites' }
]


export var sim_movies_list = []  
export var tmdb_movies_list = []



async function get_recomendation(name) {
  try {
    
    const sim_res = await fetch("http://127.0.0.1:8000/get_recommendations?movie_name="+name)
    const sim_data = await sim_res.json()

    if (!sim_res.ok) {
      throw new Error(`HTTP error! status: ${sim_res.status}`)
    }
 

    // now get the  movies from tmdb 

    const tmdb_movies= await fetch_movies(name)
    sim_movies_list=sim_data
    tmdb_movies_list=tmdb_movies

    console.log(sim_data,tmdb_movies)

    return sim_data,tmdb_movies || { message: 'No movies found error in fetch_movies' }

  } catch (error) {
    console.error('Error fetching movies:', error)
    return { "message": 'Error fetching movies' }
  }

  
}


async function fetch_movies(name) {
  try {
    const movie_details={}
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=api&query=${encodeURIComponent(name)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()


    movie_details.id=data.results[0].id
    movie_details.title=data.results[0].title
    movie_details.description=data.results[0].overview
    movie_details.year=data.results[0].release_date ? parseInt(data.results[0].release_date.split('-')[0]) : 'N/A'
    movie_details.rating=data.results[0].vote_average || 'N/A'
    movie_details.categories=data.results[0].genre_ids || []
    movie_details.poster=data.results[0].poster_path ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}` : 'https://via.placeholder.com/800x1200'

    return movie_details || { message: 'No movies found error in fetch_movies' }

  } catch (error) {
    console.error('Error fetching movies:', error)
    return { message: 'Error fetching movies' }
  }
}




export default function Navbar({ activeView, onSelectView, search, onSearchChange, onClearSearch, onSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  // const [sim_movies, setsimMovies] = useState(["nothing"])
  // const [tmdb_movies, setTmdbMovies] = useState(["nothing"])



  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const pills = useMemo(() => NAV, [])

  const handleSelect = (key) => {
    onSelectView(key)
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="nav">
      <div className="container">
        <div className="navInner">
          <div className="brand" role="banner" aria-label="CinePulse">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandTitle">CinePulse</div>
              <div className="brandSubtitle">Cinematic recommendations</div>
            </div>
          </div>

          <nav className="navLinks" aria-label="Primary">
            {pills.map((item) => (
              <button
                key={item.key}
                className={item.key === activeView ? 'navPill navPillActive' : 'navPill'}
                onClick={() => handleSelect(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="rightCluster">
            <SearchBar value={search} onChange={onSearchChange} onClear={onClearSearch} onSearch={onSearch} />
            <button onClick={() => get_recomendation(search)}></button>
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
  )
}
