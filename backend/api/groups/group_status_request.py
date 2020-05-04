from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.updation_functions import update_group_status, add_new_users_group, \
    remove_user_from_pending
from database_functions.groups.querying_functions import get_group_current_users
from ast import literal_eval
from time import time

groupStatusAPI = Blueprint('groupStatusAPI', __name__)


# API to create a group for cost sharing
@groupStatusAPI.route('/group/groupStatus', methods=['POST'])
@cross_origin()
def group_status_update():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), request.json['user_name'])
        all_status = request.json['group_status']
        for each_status in all_status:
            status = each_status[1]
            group_id = each_status[0]
            update_group_status(connection(), group_id, user_name, status)
            remove_user_from_pending(connection(), group_id, user_name)
            if status == 'accepted':
                current_users = get_group_current_users(connection(), group_id)
                new_users = literal_eval(current_users)
                new_users.append(user_name)
                add_new_users_group(connection(), group_id, str(new_users))
            # adding transaction to logs
            insert_into_recent_table(connection(), user_name, str(time()), "Changed group status", status)
        return jsonify(True)
    except:
        return jsonify(False)
