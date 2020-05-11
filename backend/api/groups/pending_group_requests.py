from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.querying_functions import get_pending_groups, get_pending_admin_approvals

pendingRequestsApi = Blueprint('pendingRequestsApi', __name__)


# API to create a group for cost sharing
@pendingRequestsApi.route('/group/pendingRequests', methods=['GET'])
@cross_origin()
def change_admin():
    try:
        user_name = request.args.get('user_name')
        pending_groups = get_pending_groups(connection(), user_name)
        group_admin_approvals = get_pending_admin_approvals(connection(), user_name)
        return jsonify({'personal_requests': pending_groups, 'group_admin_approvals': group_admin_approvals})
    except:
        return jsonify(False)

