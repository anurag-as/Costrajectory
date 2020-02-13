# coding: utf-8

from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from query_signup import *
from query_signin import *
from flask_cors import CORS, cross_origin
from database_functions import *
import time
from utilities.download import *
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


def check_validity_token(username, token):
    """
    Function to check validity of a token
    :param username: Username
    :param token: Token
    :return: Validity of a token
    """
    db = connection()
    date_time = get_datetime_token(db, username, token)
    present_time = time.time()
    timeout = 120 # seconds
    return float(present_time) - float(date_time) < timeout


@app.route('/checkValidity', methods=['POST'])
@cross_origin()
def checkValid():
    username = request.json['username']
    token = request.json['token']
    valid = check_validity_token(username, token)
    x = jsonify({'valid': valid})
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
    if valid == "User successfully authenticated":
        token = str(generate_token())
        db = connection()
        presentTime = str(time.time())
        insert_into_token_table(db, username, presentTime, token)
    else:
        token = False
    return jsonify({'valid': valid, 'token': token, 'username': username})


@app.route('/uploadBill', methods=['POST'])
@cross_origin()
def upload():
    if 'image' in request.files:
        # Image has to be uploaded
        file = request.files['image']
        file_name = file.filename
        file_extension = file_name.split('.')[-1]
        original_file_name = file_name
        present_time = str(time.time())
        file_name = present_time + '.' + file_extension
        mapped_file_name = file_name
        # adding image mapping for cross referencing later
        insert_into_image_mapping_table(connection(), request.form['username'], original_file_name, mapped_file_name)
        # uploading the file to dropbox
        uploadFile(file, file_name)
    else:
        # Image not a part of the transaction
        file_name = str(False)

    user_name = request.form['username']
    title = request.form['Name']
    date_time = request.form['Date']
    description = request.form['Description']
    amount = request.form['Amount']

    # adding the transaction record
    insert_into_image_table(connection(), user_name, title, date_time, amount, description, file_name)

    # refresh the token, needs to be added to other API Calls
    refresh_token(connection(), request.form['username'])

    return jsonify({'uploadStatus':True})


if __name__ == '__main__':
    download()
    app.run(port=5000, debug=True)
