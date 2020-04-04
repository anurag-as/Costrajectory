from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.transactions.query_transactions import query_recent_transaction
from database_functions.logs.recentLogs import get_recent_logs

recentLogsAPI = Blueprint('recentLogsAPI', __name__)


# API to return the most recent transactions
@recentLogsAPI.route('/getRecentLogsAPI', methods=['POST'])
@cross_origin()
def recentLogs():
    """
    Api to get the recent logs of a particular user.
    :return: 10 transactions for now.
    """
    user_name = request.json['username']
    refresh_token(connection(), user_name)
    try:
        limit_transactions = request.json['limit']
    except KeyError:
        limit_transactions = 10  # limit of the transaction to be retrieved
    try:
        transactions = get_recent_logs(connection(), user_name, limit_transactions)
        if not transactions:
            return jsonify({False})
        return jsonify(transactions)
    except:
        return jsonify(False)
