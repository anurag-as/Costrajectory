from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from query_signup import SignUp
from utilities.utils import generate_token
import time
from database_functions import connection, insert_into_token_table

registerUserAPI = Blueprint('registerUserAPI', __name__)

# Api to register a new user
@registerUserAPI.route('/registerUser', methods=['POST'])
@cross_origin()
def registerUser():
    username = request.json['username']
    password = request.json['password']
    signup = SignUp(username, password)
    registered = signup.add_user_after_authentication()
    token = False
    if registered:
        token = str(generate_token())
        db = connection()
        presentTime = str(time.time())
        insert_into_token_table(db, username, presentTime, token)
    x = jsonify({'username': request.json['username'], 'password': request.json['password'],
                 'registered': registered, 'token': token})
    return x
