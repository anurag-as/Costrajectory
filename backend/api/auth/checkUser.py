from flask import Blueprint
from flask_cors import CORS, cross_origin

checkUserAPI = Blueprint('checkUserAPI', __name__)

# API to check a username is available for signup
@checkUserAPI.route('/checkUser', methods=['POST'])
@cross_origin()
def checkUser():
    signup = SignUp(request.json['username'])
    username = request.json['username']
    password = request.json['password']
    x = jsonify(
        {'username': request.json['username'], 'password': request.json['password'], 'available': signup.check_user()})
    return x
