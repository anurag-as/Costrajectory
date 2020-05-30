from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_group_title, get_group_current_users
from database_functions.groups.updation_functions import update_group_status, add_new_users_group
from ast import literal_eval


from time import time

exitGroupApi = Blueprint('exitGroupApi', __name__)


# API for user to exit group
'''
If user is single user in the group, then group is deleted /deleteGroup
If user is admin, need to nominate a new admin /changeAdmin
Else, just remove user from group
'''
@exitGroupApi.route('/group/exitGroup', methods=['POST'])
@cross_origin()
def exit_group():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        current_users = get_group_current_users(connection(), group_id)
        new_users = literal_eval(current_users)
        new_users.remove(user_name)
        add_new_users_group(connection(), group_id, str(new_users))

        update_group_status(connection(), group_id, user_name, "exited")

        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Exited group", group_title)
        return jsonify(True)
    except:
        return jsonify(False)
