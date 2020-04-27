from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.query_signup import SignUp
from utilities.utils import generate_token
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.token_flow import insert_into_token_table
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.account.username_alias import add_alias
from utilities.api_utils import get_alias


registerUserAPI = Blueprint('registerUserAPI', __name__)

# Api to register a new user
@registerUserAPI.route('/auth/registerUser', methods=['POST'])
@cross_origin()
def registerUser():
    username = request.json['username']
    password = request.json['password']
    is_premium = request.json['premium']
    signup = SignUp(username, password, is_premium)
    registered = signup.add_user_after_authentication()
    token = False
    if registered:
        token = str(generate_token())
        db = connection()
        presentTime = str(time())

        # adding transaction to logs
        insert_into_recent_table(connection(), username, presentTime, "Registered Profile", "")

        # adding entry to username alias table
        alias = get_alias(username)
        add_alias(connection(), username, alias)

        insert_into_token_table(db, username, presentTime, token)
    x = jsonify({'username': request.json['username'], 'password': request.json['password'],
                 'registered': registered, 'token': token})
    return x
