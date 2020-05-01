from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.utils.bug_fix_flow import new_bugs
from werkzeug.exceptions import BadRequestKeyError

bugDetailsAPI = Blueprint('bugDetailsAPI', __name__)


# API to report bugs for users
@bugDetailsAPI.route('/utils/bugs', methods=['POST'])
@cross_origin()
def bugs():
    """
    API for reporting bugs
    """
    try:
        title = request.json['title']
        description = request.json['description']
        creation_time = str(time())
        bug_id = new_bugs(connection(), title, description, creation_time)
        return jsonify({'bug_id': bug_id})
    except:
        return jsonify(False)

