from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.querying_functions import get_bill_name
from database_functions.groups.deletion_functions import delete_from_group_bills_table, delete_from_groups_table
from utilities.delete_file import delete_file
from database_functions.logs.recentLogs import insert_into_recent_table

deleteGroupBillAPI = Blueprint('deleteGroupBillAPI', __name__)

# API to delete a particular transaction based on uid
@deleteGroupBillAPI.route('/group/deleteGroupBill', methods=['DELETE'])
@cross_origin()
def deleteTransaction():
    """
    API to delete a particular transaction
    """
    user_name = request.json['username']
    bill_id = request.json['bill_id']
    group_id = request.json['group_id']
    refresh_token(connection(), user_name)
    mapped_name = request.json['mapped_name']
    try:
        title = get_bill_name(connection(), bill_id)
        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Deleted group bill", title)

        delete_from_group_bills_table(connection(), bill_id)
        delete_from_groups_table(connection(), bill_id, group_id)
        if mapped_name:
            delete_file(mapped_name)  # deleting that image from dropbox

        return jsonify(True)
    except:
        return jsonify(False)
