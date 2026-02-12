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




async def search_tmdb_movie(movie_title):
    """Search for a movie on TMDB and return transformed data"""
    search_url = f"{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={urllib.parse.quote(movie_title)}"
    res =  await requests.get(search_url)
    response = json.loads(res.text)
    return response, urllib.parse.quote(movie_title)







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
        
        return {
            # "original": original_movie,
            "recommendations": similar_movies
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

