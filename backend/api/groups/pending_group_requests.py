from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.querying_functions import get_pending_groups

pendingRequestsApi = Blueprint('pendingRequestsApi', __name__)


# API to create a group for cost sharing
@pendingRequestsApi.route('/group/pendingRequests', methods=['GET'])
@cross_origin()
def change_admin():
    try:
        user_name = request.args.get('user_name')
        pending_groups = get_pending_groups(connection(), user_name)
        return jsonify({'body': pending_groups})
    except:
        return jsonify(False)

