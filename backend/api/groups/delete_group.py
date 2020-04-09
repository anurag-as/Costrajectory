from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.insertion_functions import insert_into_group_table, insert_into_pending_requests_table
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.deletion_functions import delete_group
from ast import literal_eval
from time import time

groupStatusAPI = Blueprint('groupStatusAPI', __name__)


# API to create a group for cost sharing
@groupStatusAPI.route('/deleteGroup', methods=['POST'])
@cross_origin()
def group_status_update():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']
        delete_group(connection(), group_id)
        delete_users_in_group(connection(), group_id)
        return jsonify(True)
    except:
        return jsonify(False)
