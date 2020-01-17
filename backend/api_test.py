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
from werkzeug.datastructures import ImmutableMultiDict

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


@app.route('/test', methods=['POST'])
@cross_origin()
def test():
    # time.sleep(5)
    print(request)
    print(request.view_args)
    print(request.form)
    return(jsonify(True))


if __name__ == '__main__':
    app.run(port=8000, debug=True)
