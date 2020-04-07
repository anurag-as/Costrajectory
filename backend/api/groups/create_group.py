from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.insertion_functions import insert_into_group_table, insert_into_pending_requests_table
from ast import literal_eval

createGroupApi = Blueprint('createGroupApi', __name__)


# API to create a group for cost sharing
@createGroupApi.route('/createGroup', methods=['POST'])
@cross_origin()
def create_sharing_group():
    try:
        group_admin = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        group_title = request.json['group_title']
        group_description = request.json['group_description']
        users = request.json['users']

        users = list(set(literal_eval(users)))  # Avoid adding same users multiple times to the groups
        current_users = str([group_admin])  # only adding admin to the group
        group_id = insert_into_group_table(connection(), group_admin, current_users, group_title, group_description)
        print(group_id)
        for user in users:
            insert_into_pending_requests_table(connection(), group_id, user, "pending")
        return jsonify(True)
    except:
        return jsonify(False)
