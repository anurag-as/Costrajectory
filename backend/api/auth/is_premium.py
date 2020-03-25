from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, is_user_premium, refresh_token

isPremiumAPI = Blueprint('isPremiumAPI', __name__)


# API to check if a particular user is Premium
@isPremiumAPI.route('/isPremium', methods=['POST'])
@cross_origin()
def api_is_user_premium():
    try:
        username = request.json['username']
        refresh_token(connection(), request.json['username'])
        bool_is_user_premium = is_user_premium(connection(), username)
        if bool_is_user_premium == -1:
            print("Here")
            bool_is_user_premium = 'Username not found'
    except KeyError:
        bool_is_user_premium = 'Username not found'
    return jsonify({'isPremium': bool_is_user_premium})
