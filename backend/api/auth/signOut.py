from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from os import path, getcwd
from shutil import rmtree
from time import time
from utilities.upload import upload_db
from database_functions.db_connection.connection import connection
from database_functions.logs.recentLogs import insert_into_recent_table

signOutAPI = Blueprint('signOutAPI', __name__)


# API to signal that a particular user signed out
# Used to delete his data, also updating the db to remote
@signOutAPI.route('/auth/signout', methods=['DELETE'])
@cross_origin()
def signout():
    """
    API when user signs out. Delete all his transaction Data
    """
    upload_db()  # upload the dropbox server to the latest code (automation)
    user_name = request.json['username']

    # adding transaction to logs
    insert_into_recent_table(connection(), user_name, str(time()), "Signed Out", "")

    user_data_path = path.join(getcwd(), "temp", "." + user_name)
    if path.exists(user_data_path):
        rmtree(user_data_path)
    return jsonify(True)