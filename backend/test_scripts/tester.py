# coding: utf-8

from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from flask_cors import CORS, cross_origin
import time
from werkzeug.datastructures import ImmutableMultiDict
import os

app = Flask(__name__)
cors = CORS(app)
api = Api(app)
app_root = os.path.dirname(os.path.abspath(__file__))


@app.route('/test', methods=['POST'])
@cross_origin()
def test():
    # time.sleep(5)
    #img = request.files['body']
    #print(img)
    #target = os.path.join(app_root, 'static/img/')
    
    print(request.files['image'])

    file = request.files['image']
    file_name = file.filename or ''
    destination = '/'.join([app_root, file_name])
    file.save(destination)
    return(jsonify(True))


if __name__ == '__main__':
    app.run(port=8000, debug=True)
