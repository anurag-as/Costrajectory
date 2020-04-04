from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_flow import insert_into_token_table
from time import time
from utilities.utils import generate_token
from utilities.query_signin import SignIn
from database_functions.logs.recentLogs import insert_into_recent_table

signInAPI = Blueprint('signInAPI', __name__)

# API to signin a user after authentication
@signInAPI.route('/signin', methods=['POST'])
@cross_origin()
def signInUser():
    username = request.json['username']
    password = request.json['password']
    sign_in = SignIn(username, password)
    if sign_in.check_user():
        valid = sign_in.check_password()
    else:
        valid = "User does not exist"
    if valid == "User successfully authenticated":
        token = str(generate_token())
        db = connection()
        presentTime = str(time())
        insert_into_token_table(db, username, presentTime, token)

        insert_into_recent_table(connection(), username, str(time()), "Signed In", "")

    else:
        token = False
    return jsonify({'valid': valid, 'token': token, 'username': username})
