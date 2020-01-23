# coding: utf-8

from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from query_signup import *
from query_signin import *
from flask_cors import CORS, cross_origin
import database_functions
import time
from utilities.upload import *
import os

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


# Api to check if user exists
# Exposed API to check if user exists
# Route /check_user/<username
# Returns true if user exists, false if user does not exists
class CheckUser(Resource):
    def get(self, username):
        signup = SignUp(username)
        return jsonify(signup.check_user())


# Api to Add a user
# Route /add_user/<username>/<password>
class AddUser(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        signup = SignUp(username, password)
        return jsonify(signup.add_user())


api.add_resource(CheckUser, '/check_user/<username>')
api.add_resource(AddUser, '/add_user/<username>/')


@app.route('/checkUser', methods=['POST'])
@cross_origin()
def checkUser():
    # time.sleep(5)
    signup = SignUp(request.json['username'])
    username = request.json['username']
    password = request.json['password']
    x = jsonify(
        {'username': request.json['username'], 'password': request.json['password'], 'available': signup.check_user()})
    return x


@app.route('/registerUser', methods=['POST'])
@cross_origin()
def registerUser():
    username = request.json['username']
    password = request.json['password']
    signup = SignUp(username, password)

    x = jsonify({'username': request.json['username'], 'password': request.json['password'],
                 'registered': signup.add_user_after_authentication()})
    return x


@app.route('/signin', methods=['POST'])
@cross_origin()
def signInUser():
    username = request.json['username']
    password = request.json['password']
    signin = SignIn(username, password)
    if signin.check_user():
        valid = signin.check_password()
    else:
        valid = "User does not exist"
    return jsonify({'valid':valid})

@app.route('/uploadBill', methods=['POST'])
@cross_origin()
def upload():
    if 'image' not in request.files:
        return jsonify({'uploadStatus': False})
    file = request.files['image']
    fileName = file.filename
    fileExtension = fileName.split('.')[-1]
    fileName = str(time.time()) + '.' + fileExtension
    uploadFile(file, fileName)
    return jsonify({'uploadStatus':True})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
