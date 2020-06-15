from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.insertion_functions import insert_into_group_table, insert_into_pending_requests_table, \
    insert_into_admin_approvals_table
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_status_for_group, get_group_title, get_group_pending_users \
    , get_group_pending_state_machine, get_group_admin_approval
from database_functions.groups.updation_functions import update_group_status, add_new_pending_users_group, \
    update_pending_state_machine
from time import time

addUsersGroupNonAdminApi = Blueprint('addUsersGroupNonAdminApi', __name__)


# API for non admins to add users to group
@addUsersGroupNonAdminApi.route('/group/addUsersGroupNonAdmin', methods=['POST'])
@cross_origin()
def add_users_to_group_non_admin():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), user_name)
        users = request.json['users']
        users = list(set(users))  # Avoid adding same users multiple times to the groups

        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        group_admin = request.json['group_admin']

        response = {'success': [], 'fail': []}

        if not group_title:
            return jsonify(False)
        for user in users:
            #  if user has rejected the group, or exited, or has been removed, update the status to pending
            if get_status_for_group(connection(), group_id, user, "rejected") or \
                    get_status_for_group(connection(), group_id, user, "removed") or \
                    get_status_for_group(connection(), group_id, user, "exited") or \
                    get_status_for_group(connection(), group_id, user, "pending"):

                if get_status_for_group(connection(), group_id, user, "rejected") and \
                        get_group_pending_state_machine(connection(), user, group_id) >= 4:
                    # user has rejected the group too many times, can't be added
                    response['fail'].append(user)
                else:  # successfully add the user to the group
                    update_group_status(connection(), group_id, user, "awaiting")
                    response['success'].append(user)
                    if not get_group_admin_approval(connection(), user, group_id):  # to avoid duplicates
                        insert_into_admin_approvals_table(connection(), group_admin, "awaiting", "add",
                                                          user, group_title, group_id)
            #  if user entry does not exist in the group, then add a new entry
            elif not get_status_for_group(connection(), group_id, user, "accepted"):
                response['success'].append(user)
                insert_into_pending_requests_table(connection(), group_id, user, "awaiting", 0)
                if not get_group_admin_approval(connection(), user, group_id):
                    insert_into_admin_approvals_table(connection(), group_admin, "awaiting", "add",
                                                      user, group_title, group_id)
        # adding transaction to logs

        if response['success']:
            message = "You added a few users to the group " + group_title + ". The users are: "
            message_description = response['success']
            insert_into_recent_table(connection(), user_name, str(time()), "Added users to group" + group_title,
                                     message + str(message_description))

        return jsonify(response)
    except:
        return jsonify(False)
