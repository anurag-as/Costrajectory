from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.updation_functions import update_group_status, add_new_users_group, \
    remove_user_from_pending, update_pending_state_machine
from database_functions.groups.querying_functions import get_group_title
from database_functions.groups.querying_functions import get_group_current_users, get_group_pending_state_machine
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
                update_pending_state_machine(connection(), group_id, user_name, 0)

            if status == 'rejected':
                rejects = get_group_pending_state_machine(connection(), user_name, group_id)
                rejects += 1
                update_pending_state_machine(connection(), group_id, user_name, rejects)

            group_title = get_group_title(connection(), group_id)
            message = "You just changed your status in the group " + group_title + " to " + status + ". Hope you are " \
                                                                                                     "well served! "
            # adding transaction to logs
            insert_into_recent_table(connection(), user_name, str(time()), "14:Changed group status of " + group_title,
                                     message)
        return jsonify(True)
    except:
        return jsonify(False)
