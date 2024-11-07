from sklearn.feature_extraction.text import TfidfVectorizer
from janome.tokenizer import Tokenizer

tokenizer = Tokenizer()
vectorizer = TfidfVectorizer()

def tokenize(text):
    return ' '.join(token.surface for token in tokenizer.tokenize(text))

def vectorize_texts(me, targets):
    # 分割する
    tokenized_me = tokenize(me)
    tokenized_targets = [tokenize(target) for target in targets]
    
    corpus = [tokenized_me] + tokenized_targets
    tfidf_Mtx = vectorizer.fit_transform(corpus)
    return tfidf_Mtx