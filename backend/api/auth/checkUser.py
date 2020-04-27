from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.query_signup import SignUp

checkUserAPI = Blueprint('checkUserAPI', __name__)

# API to check a username is available for signup
@checkUserAPI.route('/auth/checkUser', methods=['POST'])
@cross_origin()
def checkUser():
    signup = SignUp(request.json['username'])
    username = request.json['username']
    password = request.json['password']
    x = jsonify(
        {'username': username, 'password': password, 'available': signup.check_user()})
    return x
