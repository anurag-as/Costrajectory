from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.deletion_functions import delete_group, delete_users_in_group
from database_functions.groups.querying_functions import get_group_title
from time import time

deleteGroupAPI = Blueprint('deleteGroupAPI', __name__)


# API to create a group for cost sharing
@deleteGroupAPI.route('/group/deleteGroup', methods=['POST'])
@cross_origin()
def group_status_update():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        delete_group(connection(), group_id)
        delete_users_in_group(connection(), group_id)

        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Deleted Group", group_title)

        return jsonify(True)
    except:
        return jsonify(False)
