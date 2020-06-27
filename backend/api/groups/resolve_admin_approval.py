from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_group_title
from database_functions.groups.updation_functions import resolve_admin_approval
from time import time

resolveAdminApprovalApi = Blueprint('resolveAdminApprovalApi', __name__)


# API to move admin approval awaiting to resolved state
# Condition 4 of 4, when admin rejects a removal claim from a non user
@resolveAdminApprovalApi.route('/group/resolveAdminApproval', methods=['POST'])
@cross_origin()
def add_users_to_group():
    try:
        group_admin = request.json['user_name']
        refresh_token(connection(), group_admin)
        users = request.json['users']
        users = list(set(users))  # Avoid adding same users multiple times to the groups
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        for user in users:
            try:  # resolving admin approvals
                resolve_admin_approval(connection(), group_admin, "remove", user, group_id)
            except:
                pass

        # adding transaction to logs
        message = "You as a group admin of the group " + group_title + " rejected the claim to remove the users"
        message_description = "The users are " + str(users)
        insert_into_recent_table(connection(), group_admin, str(time()),
                                 "17:Rejected claim to remove users from group" + group_title, message+message_description)

        return jsonify(True)
    except:
        return jsonify(False)
