from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.premium_flow import is_user_premium
from database_functions.account.token_auth_flow import refresh_token


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
            bool_is_user_premium = 'Username not found'
    except KeyError:
        bool_is_user_premium = 'Username not found'
    return jsonify({'isPremium': bool_is_user_premium})
