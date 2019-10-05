from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from query_signup import *
from flask_cors import CORS, cross_origin


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
api.add_resource(AddUser, '/add_user')


if __name__ == '__main__':
    app.run(port=8000,debug=True)
