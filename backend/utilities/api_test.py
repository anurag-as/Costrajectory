# coding: utf-8

from flask import Flask, request
from flask_restful import Api
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
api = Api(app)


@app.route('/test', methods=['POST'])
@cross_origin()
def test():
    print(request)
    print(request.view_args)
    print(request.form)
    return jsonify(True)


if __name__ == '__main__':
    app.run(port=8000, debug=True)
