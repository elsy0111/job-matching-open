from firebase_functions import https_fn, options
from flask import request
import json

# 日本語文字化け対策 
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

import os
firebaseConfig = json.loads(open('./secrets/firebaseConfig.json').read())
cred_file_path = "./secrets/credfile.json" 

# src をパスに追加
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import src.data_manager as data_manager
import src.matcher as matcher

# Initialize classes for job matching service
data_manager.init(credentials_path=cred_file_path, database_url=firebaseConfig['databaseURL'])

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["*"],
        cors_methods=["POST"]
    )
)
def findmatches(req:https_fn.Request) -> https_fn.Response:
    try:
        # body　から  role : string, userEmail : string を取得
        body = request.get_json(silent=True)
        if body is None:
            return https_fn.Response(
                response=json.dumps({"error": "No input provided"}),
                status=400,
            )
        role = body['role']
        userEmail = body['userEmail']
        token= body['token']
        if (int(token) % 998244353 != 0):
            return https_fn.Response(
                response=json.dumps({"error": "Invalid token"}),
                status=401,
            )
        print(role, userEmail)
        matches = { "role": role, "userEmail": userEmail }

        me = data_manager.getMyInfo(role, userEmail)
        targets = data_manager.getTargets(role)
        
        matches = matcher.find_matches(me, targets)
        
        return https_fn.Response(
            response=json.dumps(matches),
            status=200,
        )
    except Exception as e:
        sys.stderr.write(f"Error in find_matches: {str(e)}\n")
        return https_fn.Response(
            response=json.dumps({"error": str(e)}),
            status=500,
        )