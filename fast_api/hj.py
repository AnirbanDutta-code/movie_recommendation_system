
from fastapi import FastAPI, HTTPException, Query, Path, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
import json
from uuid import uuid4,UUID
from datetime import datetime
from loadmodel import find_similarity
import httpx
import json


TMDB_API_KEY = '77f2016e7b6cad8f1efeb0af19818ca3'
TMDB_BASE_URL = 'https://api.themoviedb.org/3'
TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280'



async def search_tmdb_movie(movie_title):
    """Search for a movie on TMDB and return transformed data"""
    if 1==1:
        search_url = f"{TMDB_BASE_URL}/search/movie?api_key={TMDB_API_KEY}&query={httpx.utils.quote(movie_title)}"
        async with httpx.AsyncClient() as client:
            response = await client.get(search_url, timeout=10)
            data = response.json()
            return data

import asyncio

async def main():
    movie_obj = await search_tmdb_movie("Inception")
    print(json.dumps(movie_obj, indent=2))

asyncio.run(main())