from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from query_signup import *


app = Flask(__name__)
api = Api(app)


# Api to check if user exists
# Exposed API to check if user exists
# Route /checkuser/<username>/<password>
# Returns true if user exists, false if user does not exists
class CheckUser(Resource):
    def get(self, username, password):
        signup = SignUp(username, password)
        return jsonify(signup.check_user())


api.add_resource(CheckUser, '/checkuser/<username>/<password>')


if __name__ == '__main__':
    app.run(port=8000)
