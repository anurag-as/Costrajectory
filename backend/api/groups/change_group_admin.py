from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.groups.updation_functions import change_group_admin

changeGroupAdminApi = Blueprint('changeGroupAdminApi', __name__)


# API to create a group for cost sharing
@changeGroupAdminApi.route('/changeGroupAdmin', methods=['POST'])
@cross_origin()
def change_admin():
    try:
        group_admin = request.json['group_admin']
        refresh_token(connection(), request.json['user_name'])
        group_id = request.json['group_id']

        change_group_admin(connection(), group_id, group_admin)

        return jsonify(True)
    except:
        return jsonify(False)
