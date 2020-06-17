from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.token_auth_flow import refresh_token
from database_functions.account.profile_details_flow import query_profile_details, insert_into_profile_details, \
    edit_profile_table
from database_functions.account.username_alias import update_alias
from database_functions.logs.recentLogs import insert_into_recent_table

profileDetailsAPI = Blueprint('profileDetailsAPI', __name__)


# function to update the username alias
def form_username_alias(first_name, last_name):
    if len(first_name) > 0 and len(last_name) > 0:
        return first_name[0] + last_name[0]
    try:
        return first_name[0] + first_name[1]
    except IndexError:
        try:
            return first_name[0]*2
        except IndexError:
            try:
                return last_name[0] + last_name[1]
            except IndexError:
                try:
                    return last_name[0]*2
                except IndexError:
                    return False


# API to get usage details for a particular user
@profileDetailsAPI.route('/account/profileDetails', methods=['POST', 'GET'])
@cross_origin()
def profile_details():
    """
    API for querying and updating profile details
    """
    try:
        # Post request for updating the details
        if request.method == 'POST':
            user_name = request.form['user_name']

            # refreshing token for sign in
            refresh_token(connection(), user_name)

            first_name = request.form['first_name']
            last_name = request.form['last_name']

            alias = form_username_alias(first_name, last_name)
            if alias:
                update_alias(connection(), user_name, alias)

            email = request.form['email']
            address = request.form['address']
            address2 = request.form['address2']
            dob = request.form['dob']
            gender = request.form['gender']
            country = request.form['country']
            state = request.form['state']
            zip_code = request.form['zip_code']

            description = {'First Name': first_name,
                           'Last Name': last_name,
                           'Email Address': email,
                           'Address': address,
                           'Address2': address2,
                           'Date of Birth': dob,
                           'Gender': gender,
                           'Country': country,
                           'State': state,
                           'Zip Code': zip_code}
            message = "You just updated your profile details! "

            # adding transaction to logs
            insert_into_recent_table(connection(), user_name, str(time()), "Profile Details Updated",
                                     message + str(description))

            if not query_profile_details(connection(), user_name):  # User entry does not exist
                return jsonify(
                    insert_into_profile_details(connection(), user_name, first_name, last_name, email, address, address2,
                                                dob, gender, country, state, zip_code))
            else:
                return jsonify(edit_profile_table(connection(), user_name, first_name, last_name, email, address, address2,
                                                  dob, gender, country, state, zip_code))

        else:
            user_name = request.args.get('user_name')
            refresh_token(connection(), user_name)
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
    except:
        return jsonify(False)
