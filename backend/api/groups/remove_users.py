from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_status_for_group, get_group_title, get_group_current_users
from database_functions.groups.updation_functions import update_group_status, add_new_users_group
from ast import literal_eval
from time import time

removeUsersGroupApi = Blueprint('removeUsersGroupApi', __name__)


# API to remove users from a group
@removeUsersGroupApi.route('/group/removeUsersGroup', methods=['POST'])
@cross_origin()
def remove_users_from_group():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), user_name)
        users = request.json['users']
        users = list(set(users))  # Avoid adding same users multiple times to the groups
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        for user in users:
            update_group_status(connection(), group_id, user, "removed")
            current_users = get_group_current_users(connection(), group_id)
            new_users = literal_eval(current_users)
            new_users.remove(user)
            add_new_users_group(connection(), group_id, str(new_users))
        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Removed users from group", group_title)

        return jsonify(True)
    except:
        return jsonify(False)
