import os ,pathlib
import pickle
from sklearn.metrics.pairwise import cosine_similarity


dataFrame_path=("/home/anirban/projects/movie_recomendation_system/backend_model_plk_files/df_optimized.pkl")

indices_path=("/home/anirban/projects/movie_recomendation_system/backend_model_plk_files/indices.pkl")

tfidfMatrix_path=("/home/anirban/projects/movie_recomendation_system/backend_model_plk_files/tfidf_matrix.pkl")

tfidf_path=("/home/anirban/projects/movie_recomendation_system/backend_model_plk_files/tfidf_matrix.pkl")

df=pickle.load(open(dataFrame_path, 'rb'))
indices=pickle.load(open(indices_path, 'rb'))
tfidf_matrix=pickle.load(open(tfidfMatrix_path, 'rb'))
tfidf=pickle.load(open(tfidf_path, 'rb'))


def find_similarity(title,n=10):
    if title not in indices:
        print("film not found data frame")
    else:
        idx=indices[title] 
        similarity=cosine_similarity(tfidf_matrix[idx],tfidf_matrix).flatten()
        idx_of_sims=similarity.argsort()[::-1][1:n+1]
        name=df['title'].iloc[idx_of_sims].to_list()
        return name



# films=find_similarity("Avatar",20)

# print(len(films))


