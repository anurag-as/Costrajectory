from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.insertion_functions import insert_into_group_table, insert_into_pending_requests_table
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_status_for_group, get_group_title
from database_functions.groups.updation_functions import update_group_status

from time import time

addUsersGroupApi = Blueprint('addUsersGroupApi', __name__)


# API to add users to a group
@addUsersGroupApi.route('/group/addUsersGroup', methods=['POST'])
@cross_origin()
def add_users_to_group():
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
            #  if user has rejected the group, or exited, or has been removed, update the status to pending
            if get_status_for_group(connection(), group_id, user, "rejected") or \
                    get_status_for_group(connection(), group_id, user, "removed") or \
                    get_status_for_group(connection(), group_id, user, "exited"):
                update_group_status(connection(), group_id, user, "pending")
            #  if user entry does not exist in the group, then add a new entry
            elif not get_status_for_group(connection(), group_id, user, "accepted"):
                insert_into_pending_requests_table(connection(), group_id, user, "pending")

        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Added additional users to group", group_title)

        return jsonify(True)
    except:
        return jsonify(False)
