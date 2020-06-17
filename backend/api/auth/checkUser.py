from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from utilities.query_signup import SignUp
from database_functions.db_connection.connection import connection
from database_functions.groups.querying_functions import get_status_for_group, get_group_pending_state_machine

checkUserAPI = Blueprint('checkUserAPI', __name__)


# API to check a username is available for signup
@checkUserAPI.route('/auth/checkUser', methods=['POST'])
@cross_origin()
def check_user():
    signup = SignUp(request.json['username'])
    username = request.json['username']
    try:
        group_id = request.json['group_id']
        if get_status_for_group(connection(), group_id, username, "rejected") and \
                get_group_pending_state_machine(connection(), username, group_id) >= 4:
            message = 'User has rejected the group too many times'
        else:
            message = 'Request successfully sent to user'
        x = jsonify(
            {'username': username, 'available': signup.check_user(), 'message': message
             })
    except KeyError:
        x = jsonify(
            {'username': username, 'available': signup.check_user()
             })
    return x
