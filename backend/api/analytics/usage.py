from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.account.space_flow import space_usage
from database_functions.account.premium_flow import is_user_premium

from utilities.utils import get_total_size

usageAPI = Blueprint('usageAPI', __name__)

# API to get usage details for a particular user
@usageAPI.route('/analytics/usage', methods=['POST'])
@cross_origin()
def user_space_usage():
    """
    API for usage details
    """
    user_name = request.json['username']
    refresh_token(connection(), user_name)
    size = space_usage(connection(), user_name)
    bool_is_user_premium = is_user_premium(connection(), user_name)
    premium = False
    if bool_is_user_premium == 'True':
        premium = True
    total_quota = get_total_size(premium)
    return jsonify({'TotalQuota': total_quota, 'UsedQuota': size})
