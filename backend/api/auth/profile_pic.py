from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.colouring_board import generate_image

profilePicApi = Blueprint('profilePicApi', __name__)


# API to check a username is available for signup
@profilePicApi.route('/profilePic', methods=['POST'])
@cross_origin()
def profile_pic_random():
    try:
        return generate_image()
    except:
        return jsonify({'Error': 'Failed to get profile Picture'})
