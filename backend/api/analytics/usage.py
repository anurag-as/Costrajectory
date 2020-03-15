from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, refresh_token, space_usage
from utilities.utils import get_total_size

usageAPI = Blueprint('usageAPI', __name__)

# API to get usage details for a particular user
@usageAPI.route('/usage', methods=['POST'])
@cross_origin()
def user_space_usage():
    """
    API for usage details
    """
    user_name = request.json['username']
    refresh_token(connection(), user_name)
    size = space_usage(connection(), user_name)
    total_quota = get_total_size()
    return jsonify({'TotalQuota': total_quota, 'UsedQuota': size})
