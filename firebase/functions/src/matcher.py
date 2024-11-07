import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

import sys, os

# src をパスに追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.vectorizer import vectorize_texts as vectorize

# me      =   {"email":"kpp0193@gmail_com","text":"ばられそ"}
# targets =  [{"email":"0193vexy@gmail_com","text":"a"},
#             {"email":"hanma794@gmail_com","text":"ばられそ"},
#             {"email":"vexy0193@gmail_com","text":"!?"}]
def find_matches(me, targets, threshold=0.00):
    num_jobs = len(targets)
    me_text = me['text']
    targets_text = [target['text'] for target in targets]

    vectorized = vectorize(me_text, targets_text)
    
    me_vec = vectorized[0]
    targets_vec = vectorized[1:]
    
    similarities = cosine_similarity(me_vec, targets_vec)
    
    matcher = []
    
    for i, score in enumerate(similarities[0]):
        if score >= threshold:
            matcher.append({targets[i]['email']:round(float(score)*100)})
        # print(f"Score with {targets[i]['email']}: {score * 100//1}")
        # print(f"targets_text: {targets_text[i]}")
    
    matcher.sort(reverse=True, key=lambda x: list(x.values())[0])

    print(matcher)

    return matcher