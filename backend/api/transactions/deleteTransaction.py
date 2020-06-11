from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.transactions.create_bill import delete_from_image_table, get_bill_name
from utilities.delete_file import delete_file
from database_functions.transactions.query_transactions import query_particular_transaction
from database_functions.logs.recentLogs import insert_into_recent_table

deleteTransactionsAPI = Blueprint('deleteTransactionsAPI', __name__)


# API to delete a particular transaction based on uid
@deleteTransactionsAPI.route('/transactions/deleteTransaction', methods=['DELETE'])
@cross_origin()
def delete_transaction():
    """
    API to delete a particular transaction
    """
    user_name = request.json['username']
    uid = request.json['uid']
    refresh_token(connection(), user_name)
    mapped_name = request.json['mapped_name']
    try:
        title = get_bill_name(connection(), uid)
        # adding transaction to logs
        bill_data = query_particular_transaction(connection(), uid)
        message = "You just deleted this transaction "
        insert_into_recent_table(connection(), user_name, str(time()), "Deleted Transaction",
                                 message + title + str(bill_data))

        message = delete_from_image_table(connection(), uid, user_name)
        delete_file(mapped_name)  # deleting that image from dropbox
        return jsonify(message)
    except:
        return jsonify("Deleting the transaction failed.")
