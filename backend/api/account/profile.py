from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, query_profile_details, insert_into_profile_details, edit_profile_table

profileDetailsAPI = Blueprint('profileDetailsAPI', __name__)


# API to get usage details for a particular user
@profileDetailsAPI.route('/usage', methods=['POST', 'GET'])
@cross_origin()
def profile_details():
    """
    API for querying and updating profile details
    """

    # Post request for updating the details
    if request.method == 'POST':
        user_name = request.form['user_name']
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        address = request.form['address']
        address2 = request.form['address2']
        dob = request.form['dob']
        gender = request.form['gender']
        country = request.form['country']
        state = request.form['state']
        zip_code = request.form['zip_code']
        if not query_profile_details(connection(), user_name):  # User entry does not exist
            insert_into_profile_details(connection(), user_name, first_name, last_name, email, address, address2,
                                        dob, gender, country, state, zip_code)
        else:
            edit_profile_table(connection(), user_name, first_name, last_name, email, address, address2,
                               dob, gender, country, state, zip_code)

    else:
        user_name = request.args.get('user_name')
        if not query_profile_details(connection(), user_name):  # User entry does not exist
            return jsonify(user_name, first_name, last_name, email, address, address2,
                               dob, gender, country, state, zip_code)