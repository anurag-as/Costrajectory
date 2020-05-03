from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.colouring_board import generate_image
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token

from os import getcwd, path, makedirs
from pickle import dump, load

profilePicApi = Blueprint('profilePicApi', __name__)


# API to check a username is available for signup
@profilePicApi.route('/auth/profilePic', methods=['POST'])
@cross_origin()
def profile_pic_random():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        profile_pic_path = path.join(getcwd(), "temp", "."+user_name, "profile_pic", 'pic')
        if not path.exists(profile_pic_path):
            # Caching and Saving profile pic
            profile_pic = generate_image()
            if not path.exists(path.split(profile_pic_path)[0]):
                makedirs(path.split(profile_pic_path)[0])
            with open(profile_pic_path, 'w') as fp:
                pass
            dump(profile_pic, file=open(profile_pic_path, "wb"))
        # Profile pic already cached
        profile_pic = load(open(profile_pic_path, "rb"))
        return profile_pic
    except:
        return jsonify({'Error': 'Failed to get profile Picture'})
