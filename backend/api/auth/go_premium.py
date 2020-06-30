from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.account.token_auth_flow import refresh_token
from database_functions.db_connection.connection import connection
from database_functions.account.premium_flow import is_user_premium, user_go_premium
from database_functions.logs.recentLogs import insert_into_recent_table

goPremiumAPI = Blueprint('goPremiumAPI', __name__)


# API to check if a particular user is Premium
@goPremiumAPI.route('/auth/goPremium', methods=['POST'])
@cross_origin()
def api_go_premium():
    try:
        username = request.json['username']
        refresh_token(connection(), request.json['username'])

        message = "Now, we're talking, you are premium, way to go!"
        # adding transaction to logs
        insert_into_recent_table(connection(), username, str(time()), "1:Premium User", message)

        bool_is_user_premium = is_user_premium(connection(), username)
        if bool_is_user_premium == 'False':
            user_go_premium(connection(), username)
            bool_is_user_premium = is_user_premium(connection(), username)
    except KeyError:
        bool_is_user_premium = 'Username not found'
    return jsonify({'isPremium': bool_is_user_premium})
