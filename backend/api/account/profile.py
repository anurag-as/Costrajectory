from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from database_functions import connection, query_profile_details, insert_into_profile_details, edit_profile_table

profileDetailsAPI = Blueprint('profileDetailsAPI', __name__)


# API to get usage details for a particular user
@profileDetailsAPI.route('/profileDetails', methods=['POST', 'GET'])
@cross_origin()
def profile_details():
    """
    API for querying and updating profile details
    """
    # Post request for updating the details
    if request.method == 'POST':
        print("Here")
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
            return jsonify(
                insert_into_profile_details(connection(), user_name, first_name, last_name, email, address, address2,
                                            dob, gender, country, state, zip_code))
        else:
            return jsonify(edit_profile_table(connection(), user_name, first_name, last_name, email, address, address2,
                                              dob, gender, country, state, zip_code))

    else:
        user_name = request.args.get('user_name')
        if not query_profile_details(connection(), user_name):  # User entry does not exist
            response = {
                'user_name': user_name,
                'first_name': '',
                'last_name': '',
                'email': '',
                'address': '',
                'address2': '',
                'dob': '',
                'gender': '',
                'country': '',
                'state': '',
                'zip_code': None
            }
        else:
            data = query_profile_details(connection(), user_name)
            response = {
                'user_name': user_name,
                'first_name': data[1],
                'last_name': data[2],
                'email': data[3],
                'address': data[4],
                'address2': data[5],
                'dob': data[6],
                'gender': data[7],
                'country': data[8],
                'state': data[9],
                'zip_code': data[10]
            }
        return jsonify(response)
