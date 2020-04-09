from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_group_title
from database_functions.groups.updation_functions import update_group_status

from time import time

exitGroupApi = Blueprint('exitGroupApi', __name__)


# API for user to exit group
'''
If user is single user in the group, then group is deleted /deleteGroup
If user is admin, need to nominate a new admin /changeAdmin
Else, just remove user from group
'''
@exitGroupApi.route('/exitGroup', methods=['POST'])
@cross_origin()
def exit_group():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)

        update_group_status(connection(), group_id, user_name, "removed")

        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Exited group", group_title)
        return jsonify(True)
    except:
        return jsonify(False)
