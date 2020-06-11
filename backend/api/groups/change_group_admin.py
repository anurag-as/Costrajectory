from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.updation_functions import change_group_admin
from database_functions.logs.recentLogs import insert_into_recent_table
from database_functions.groups.querying_functions import get_group_title
from time import time

changeGroupAdminApi = Blueprint('changeGroupAdminApi', __name__)


# API to create a group for cost sharing
@changeGroupAdminApi.route('/group/changeGroupAdmin', methods=['POST'])
@cross_origin()
def change_admin():
    try:
        group_admin = request.json['group_admin']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']
        group_title = get_group_title(connection(), group_id)
        if not group_title:
            return jsonify(False)
        change_group_admin(connection(), group_id, group_admin)

        # adding transaction to logs
        message = "Group: %s, New Admin: %s" % (group_title, group_admin)
        insert_into_recent_table(connection(), group_admin, str(time()), "Changed group admin of " + group_title,
                                 message)
        return jsonify(True)
    except:
        return jsonify(False)
