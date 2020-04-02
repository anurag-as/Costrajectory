from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from os import path, getcwd
from utilities.download import download_file
from base64 import b64encode


previewImageAPI = Blueprint('previewImageAPI', __name__)


# API to return an image in b'64 format for preview(large view/downloading)
@previewImageAPI.route('/previewImage', methods=['POST'])
@cross_origin()
def previewImage():
    """
    API to preview the image for a particular transaction
    """
    user_name = request.json['username']
    mapped_image_name = request.json['mapped_name']
    original_image_name = request.json['original_name']
    refresh_token(connection(), user_name)
    try:
        # downloading the image to cacheable region
        user_name = str('.' + user_name)
        file = path.join(getcwd(), "temp", user_name, mapped_image_name)
        if not path.exists(file):
            download_file(user_name, mapped_image_name, original_image_name)
        with open(file, "rb") as f:
            Image_data = f.read()
            encoded_string = b64encode(Image_data)
        return jsonify({'Image': str(encoded_string.decode('utf-8'))})
    except:
        return jsonify(False)
