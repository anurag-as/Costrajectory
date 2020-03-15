from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from os import path, getcwd
from shutil import rmtree
from utilities.upload import upload_db

signOutAPI = Blueprint('signOutAPI', __name__)


# API to signal that a particular user signed out
# Used to delete his data, also updating the db to remote
@signOutAPI.route('/signout', methods=['DELETE'])
@cross_origin()
def signout():
    """
    API when user signs out. Delete all his transaction Data
    """
    upload_db()  # upload the dropbox server to the latest code (automation)
    user_name = request.json['username']
    user_data_path = path.join(getcwd(), "temp", "." + user_name)
    if path.exists(user_data_path):
        rmtree(user_data_path)
    return jsonify(True)