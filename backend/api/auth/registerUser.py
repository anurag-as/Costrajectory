from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from query_signup import SignUp
from utilities.utils import generate_token
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.token_flow import insert_into_token_table


registerUserAPI = Blueprint('registerUserAPI', __name__)

# Api to register a new user
@registerUserAPI.route('/registerUser', methods=['POST'])
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
        insert_into_token_table(db, username, presentTime, token)
    x = jsonify({'username': request.json['username'], 'password': request.json['password'],
                 'registered': registered, 'token': token})
    return x
