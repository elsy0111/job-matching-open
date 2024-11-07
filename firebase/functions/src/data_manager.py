# datamanager.py

from firebase_admin import db, credentials, initialize_app

def init(credentials_path: str, database_url: str):
    cred = credentials.Certificate(credentials_path)
    initialize_app(cred, {
        'databaseURL': database_url,
    })
    
def getMyInfo(role: str, userEmail: str):
    if role == "engineer":
        ref = db.reference(f'engineers/{userEmail}')
    elif role == "company":
        ref = db.reference(f'companies/{userEmail}')
    else:
        raise ValueError(f"Invalid role: {role}")
    res = {
        "email": userEmail,
        "text": ref.get()['description']
    }
    return res

def getTargets(role: str):
    if role == "engineer":
        ref = db.reference('companies')
    elif role == "company":
        ref = db.reference('engineers')
    else:
        raise ValueError(f"Invalid role: {role}")
    res = []
    for key, value in ref.get().items():
        res.append({
            "email": key,
            "text": value['description']
        })
    return res