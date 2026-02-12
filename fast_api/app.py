from fastapi import FastAPI, HTTPException, Query, Path, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
import json
from uuid import uuid4,UUID
from datetime import datetime
from loadmodel import find_similarity
import httpx
import urllib.parse
import requests



app=FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TMDB API Configuration
TMDB_BASE_URL = 'https://api.themoviedb.org/3'
TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280'


# async def search_tmdb_movie(movie_title):
#     """Search for a movie on TMDB and return transformed data"""
#     if 1==1:
#         search_url = f"https://api.themoviedb.org/3/search/movie?api_key=api&query={urllib.parse.quote(movie_title)}"
#         data=requests.get(search_url).json()
#         response = json.loads(data.text)
#         return response,urllib.parse.quote(movie_title)
#             if data.get('results') and len(data['results']) > 0:
#                 movie = data['results'][0]
                
#             return {"message": "Error  TMDB"}

#         return {"message": "Error searching TMDB"}

# Source - https://stackoverflow.com/a/61977134
# Posted by Kriti Pawar
# Retrieved 2026-02-11, License - CC BY-SA 4.0

async def search_tmdb_movie(movie_title):
    """Search for a movie on TMDB and return transformed data"""
    search_url = f"{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={urllib.parse.quote(movie_title)}"
    res =  await requests.get(search_url)
    response = json.loads(res.text)
    return response, urllib.parse.quote(movie_title)




# def transform_tmdb_movie(tmdb_movie):
#     """Transform TMDB movie data to our format"""
#     categories = []
#     if tmdb_movie.get('genres') and isinstance(tmdb_movie['genres'], list):
#         categories = [g['name'] for g in tmdb_movie['genres']]
#     else:
#         categories = ['Movie']
    
#     return {
#         'id': f"m{tmdb_movie['id']}",
#         'title': tmdb_movie.get('title') or tmdb_movie.get('name', 'Unknown'),
#         'year': int(tmdb_movie.get('release_date', '2024')[:4]) if tmdb_movie.get('release_date') else 2024,
#         'rating': float(round(tmdb_movie.get('vote_average', 0), 1)),
#         'categories': categories,
#         'trending': tmdb_movie.get('popularity', 0) > 50,
#         'tagline': tmdb_movie.get('tagline') or tmdb_movie.get('overview', '')[:60] or 'Check it out',
#         'description': tmdb_movie.get('overview', 'No description available'),
#         'poster': f"{TMDB_IMAGE_BASE_URL}{tmdb_movie['poster_path']}" if tmdb_movie.get('poster_path') else 'https://via.placeholder.com/300x450?text=No+Image',
#         'backdrop': f"{TMDB_IMAGE_BASE_URL}{tmdb_movie['backdrop_path']}" if tmdb_movie.get('backdrop_path') else 'https://via.placeholder.com/1280x720?text=No+Image',
#         'tmdbId': tmdb_movie['id'],
#     }


@app.get("/")
def root():
        return{"message":"hiii"}
    
    

@app.get("/get_recommendations")
async def get_recommendations(
    movie_name: str
):
    """Get similar movies using ML model, then fetch details from TMDB"""
    try:
        # Get similar movies from ML model
        similar_movies = find_similarity(movie_name, 20)
        
        if not similar_movies:
            raise HTTPException(status_code=404, detail='Movie not found in database')
        
        # Search the original movie on TMDB
        # original_movie = await search_tmdb_movie(movie_name)
        
        # if not original_movie:
        #     raise HTTPException(status_code=404, detail='Movie not found on TMDB')
        
        # Search each recommended movie on TMDB
        # recommended_movies = []
        # for movie_title in similar_movies:
        #     movie_data = await search_tmdb_movie(movie_title)
        #     if movie_data:
        #         recommended_movies.append(movie_data)
        
        return {
            # "original": original_movie,
            "recommendations": similar_movies
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

