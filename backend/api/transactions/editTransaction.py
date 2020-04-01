from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.transactions.create_bill import edit_transactions_image_table
from database_functions.transactions.image_mapping_flow import insert_into_image_mapping_table
from database_functions.account.token_auth_flow import refresh_token
from database_functions.transactions.image_size_flow import insert_into_image_size_table


from utilities.upload import uploadFile
from os import SEEK_END

editBillAPI = Blueprint('editBillAPI', __name__)

# API to edit a particular transaction based on uid
@editBillAPI.route('/editTransaction', methods=['POST'])
@cross_origin()
def edit_transaction():
    if 'image' in request.files:
        # Image has to be uploaded
        file = request.files['image']
        file_name = file.filename
        file_extension = file_name.split('.')[-1]
        original_file_name = file_name
        present_time = str(time())
        file_name = present_time + '.' + file_extension
        mapped_file_name = file_name
        # adding image mapping for cross referencing later
        insert_into_image_mapping_table(connection(), request.form['username'], original_file_name, mapped_file_name)

        # uploading the file to dropbox
        uploadFile(file, mapped_file_name)

        file.seek(0, SEEK_END)
        file_size = file.tell() / (10 ** 6)  # file_size in mb
        # adding entry to image size table
        insert_into_image_size_table(connection(), mapped_file_name, file_size)

    else:
        # Image not a part of the transaction
        mapped_file_name = str(False)
    user_name = request.form['username']
    uid = request.form['uid']
    title = request.form['Name']
    date_time = request.form['Date']
    description = request.form['Description']
    amount = request.form['Amount']
    category = request.form['category']
    # adding the transaction record
    edit_transactions_image_table(connection(), uid, user_name, title, date_time, amount, description,
                                  mapped_file_name, category)
    # refresh the token, needs to be added to other API Calls
    refresh_token(connection(), request.form['username'])
    return jsonify({'editStatus': True})
