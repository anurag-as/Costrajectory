from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.insertion_functions import insert_into_group_table

createGroupApi = Blueprint('createGroupApi', __name__)


# API to create a group for cost sharing
@createGroupApi.route('/createGroup', methods=['POST'])
@cross_origin()
def create_sharing_group():
    group_admin = request.json['user_name']
    refresh_token(connection(), request.json['user_name'])
    group_title = request.json['group_title']
    group_description = request.json['group_title']
    users = request.json['users']
    current_users = str([group_admin])
    insert_into_group_table(connection(), group_admin, current_users, group_title, group_description)
    return jsonify(True)


