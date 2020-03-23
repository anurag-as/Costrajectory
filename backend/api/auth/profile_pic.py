from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.colouring_board import generate_image
from base64 import b64encode

profilePicApi = Blueprint('profilePicApi', __name__)

# API to check a username is available for signup
@profilePicApi.route('/profilePic', methods=['GET'])
@cross_origin()
def profile_pic_random():
    try:
        Image_data = generate_image()
        encoded_string = b64encode(Image_data)
        return jsonify({'Image': str(encoded_string.decode('utf-8'))})
    except:
        return jsonify({'Error': 'Failed to get profile Picture'})
