from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.insertion_functions import insert_into_admin_approvals_table
from database_functions.groups.querying_functions import get_status_for_group, get_group_title, \
    get_group_current_users, get_group_admin_approval
from time import time

removeUsersGroupNonAdminApi = Blueprint('removeUsersGroupNonAdminApi', __name__)


# API to remove users from a group
@removeUsersGroupNonAdminApi.route('/group/removeUsersGroupNonAdmin', methods=['POST'])
@cross_origin()
def remove_users_from_group():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), user_name)
        users = request.json['users']
        users = list(set(users))  # Avoid adding same users multiple times to the groups
        group_id = request.json['group_id']
        group_admin = request.json['group_admin']

        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        for user in users:
            if not get_group_admin_approval(connection(), user, group_id):
                insert_into_admin_approvals_table(connection(), group_admin, "awaiting", "remove",
                                                  user, group_title, group_id)
        # adding transaction to logs
        message = "The users were waiting for the admins approval to be removed from the group " + group_title
        message_description = " The users are " + str(users)
        insert_into_recent_table(connection(), user_name, str(time()),
                                 "16:Awaiting approval for removed users from group " + group_title,
                                 message + message_description)

        return jsonify(True)
    except:
        return jsonify(False)
