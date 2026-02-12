:

# 🎬 Movie Recommendation System

A full-stack content-based movie recommendation system built with React and FastAPI, powered by TF-IDF vectorization and Cosine Similarity.

This application recommends movies based on textual similarity of metadata such as genres, keywords, cast, director, and overview.

# 🖼 Demo

![Movie Recommendation System Demo](demo.png)

# 🚀 Project Overview

This project implements a Content-Based Filtering Recommendation Engine using Natural Language Processing techniques.

The system:

Processes movie metadata

Combines multiple features into a single textual representation

Converts text into numerical vectors using TF-IDF

Computes similarity using Cosine Similarity

Serves recommendations via FastAPI

Displays results dynamically in a React frontend

# 🧠 Machine Learning Approach
# 1️⃣ Feature Engineering

The following features are combined into a single column:

Overview

Genres

Keywords

Cast

Director

# 2️⃣ Text Vectorization

TF-IDF Vectorizer (Term Frequency – Inverse Document Frequency)

Removes stop words

Converts text into high-dimensional sparse vectors

# 3️⃣ Similarity Calculation

Cosine Similarity

Precomputed similarity matrix for fast lookup

# 🛠 Tech Stack
## 🔹 Frontend

React

Axios

Plain CSS

Environment variables (.env)

## 🔹 Backend

FastAPI

Uvicorn

Pydantic

CORS Middleware

Python-dotenv

 ## 🔹 Data & ML

Pandas

NumPy

Scikit-learn

TF-IDF Vectorizer

Cosine Similarity

```
📂 Project Structure
movie_recommendation_system/
│
├── backend/
│   ├── main.py
│   ├── recommender.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
└── README.md
```

# ⚙️ Installation & Setup
## 1️⃣ Clone the Repository
git clone https://github.com/AnirbanDutta-code/movie_recommendation_system.git
cd movie_recommendation_system

## 🔧 Backend Setup (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt


Run the server:

```
uvicorn main:app --reload
```


Backend runs at:

http://127.0.0.1:8000


Interactive API docs available at:

http://127.0.0.1:8000/docs

## 🎨 Frontend Setup (React)
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

## 🔌 API Endpoint
Get Movie Recommendations
GET /recommend?movie_name=Inception

Example Response
{
  "movie": "Inception",
  "recommendations": [
    "Interstellar",
    "The Prestige",
    "Shutter Island",
    "Memento",
    "The Matrix"
  ]
}

## ✨ Features

Content-based filtering

Fast recommendation lookup (precomputed similarity matrix)

RESTful API architecture

Interactive API documentation (Swagger UI)

Clean and responsive UI

Modular backend structure

Environment variable support

## 📊 Dataset

Movie metadata dataset (TMDB/Kaggle style dataset)

Includes:

Movie title

Overview

Genres

Keywords

Cast

Crew (Director)

## 🔮 Future Improvements

Add collaborative filtering

Hybrid recommendation system

User authentication

Save user watch history

Deploy with Docker

Cloud deployment (AWS / Render / Vercel)

## 👨‍💻 Author

Anirban Dutta
GitHub: https://github.com/AnirbanDutta-code

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

If you want, I can now:

