from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.querying_functions import get_groups_user, get_group_info, get_bill_data

viewGroupApi = Blueprint('viewGroupApi', __name__)


# API to view all the groups for a username
@viewGroupApi.route('/viewGroup', methods=['POST'])
@cross_origin()
def viewing_group():
    try:
        user_name = request.json['user_name']
        refresh_token(connection(), user_name)

        # get all the accepted groups for a user
        groups = get_groups_user(connection(), user_name, "accepted")
        all_group_info = []
        # for each group, get all the information pertinent to the group
        for group in groups:
            group_info = get_group_info(connection(), group)
            if group_info:
                bills = []
                for bill_id in group_info['bills']:
                    bill_data = get_bill_data(connection(), bill_id)
                    if bill_data:
                        bills.append(bill_data)
                group_payload = {'group_info': group_info, 'bill_data': bills}
                all_group_info.append(group_payload)

        return jsonify({'body': all_group_info})

    except:
        return jsonify(False)
