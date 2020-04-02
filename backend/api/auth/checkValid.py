from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_flow import get_datetime_token

from time import time
checkValidTokenAPI = Blueprint('checkValidTokenAPI', __name__)


def check_validity_token(username, token):
    """
    Function to check validity of a token
    :param username: Username
    :param token: Token
    :return: Validity of a token
    """
    db = connection()
    date_time = get_datetime_token(db, username, token)
    present_time = time()
    timeout = 3600  # seconds (1 hour)
    return float(present_time) - float(date_time) < timeout


# API to check the validity of a token for a particular username (<timeout)
@checkValidTokenAPI.route('/checkValidity', methods=['POST'])
@cross_origin()
def checkValid():
    try:
        username = request.json['username']
        token = request.json['token']
        valid = check_validity_token(username, token)
    except:
        valid = False
    x = jsonify({'valid': valid})
    return x
