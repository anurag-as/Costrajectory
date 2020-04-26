from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from os import path, getcwd
from utilities.download import download_file
from base64 import b64encode
from database_functions.logs.recentLogs import insert_into_recent_table
from time import time

previewImageAPI = Blueprint('previewImageAPI', __name__)


# API to return an image in b'64 format for preview(large view/downloading)
"""
Workaround for JIRA COST-86, 
Image preview flow remains the same
1 - For personal bills, js will send the original image name, mapped image name
2 - For group bills, js will send the mapped image name, bill title
These parameters will be used to determine the bill type, and add it to the log appropriately.
Workaround as original image name is never used in the download, and preserves the caching mechanism
"""
@previewImageAPI.route('/previewImage', methods=['POST'])
@cross_origin()
def previewImage():
    """
    API to preview the image for a particular transaction
    """
    user_name = request.json['username']
    mapped_image_name = request.json['mapped_name']
    try:
        original_image_name = request.json['original_name']

        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Previewed Bill", original_image_name)

    except KeyError:
        original_image_name = ""
        bill_title = request.json['bill_title']
        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "Previewed Group Bill", bill_title)

    refresh_token(connection(), user_name)
    try:
        # downloading the image to cacheable region
        user_name = str('.' + user_name)
        file = path.join(getcwd(), "temp", user_name, mapped_image_name)
        if not path.exists(file):
            download_file(user_name, mapped_image_name, original_image_name)
        with open(file, "rb") as f:
            Image_data = f.read()
            encoded_string = b64encode(Image_data)
        return jsonify({'Image': str(encoded_string.decode('utf-8'))})
    except:
        return jsonify(False)
