from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, refresh_token, delete_from_image_table
from utilities.delete_file import delete_file

deleteTransactionsAPI = Blueprint('deleteTransactionsAPI', __name__)

# API to delete a particular transaction based on uid
@deleteTransactionsAPI.route('/deleteTransaction', methods=['DELETE'])
@cross_origin()
def deleteTransaction():
    """
    API to delete a particular transaction
    """
    user_name = request.json['username']
    uid = request.json['uid']
    refresh_token(connection(), user_name)
    mapped_name = request.json['mapped_name']
    try:
        message = delete_from_image_table(connection(), uid, user_name)
        delete_file(mapped_name)  # deleting that image from dropbox
        return jsonify(message)
    except:
        return jsonify("Deleting the transaction failed.")