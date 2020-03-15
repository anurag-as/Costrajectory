from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, refresh_token, query_recent_transaction
from api_utils import build_json_recent_transactions

recentTransactionsAPI = Blueprint('recentTransactionsAPI', __name__)


# API to return the most recent transactions
@recentTransactionsAPI.route('/getRecentTransactions', methods=['POST'])
@cross_origin()
def recentTransactions():
    """
    Api to get the recent transactions of a particular user.
    :return: 5 transactions for now. #TODO need to make it more dynamic and generalized later on.
    """
    user_name = request.json['username']
    refresh_token(connection(), user_name)
    try:
        limit_transactions = request.json['limit']
    except KeyError:
        limit_transactions = 100  # limit of the transaction to be retrieved
    try:
        transactions = query_recent_transaction(connection(), user_name, limit_transactions)
        if not transactions:
            return jsonify({False})
        return build_json_recent_transactions(transactions, user_name)
    except:
        return jsonify(False)
