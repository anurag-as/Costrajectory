from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions import connection, insert_into_image_table, insert_into_image_mapping_table, insert_into_image_size_table, refresh_token
from os import SEEK_END
from utilities.upload import uploadFile

uploadBillAPI = Blueprint('uploadBillAPI', __name__)

# API to add a new transaction
# Legacy version - Uploading a bill, hence the name
# Later version - Adding a new transaction
@uploadBillAPI.route('/uploadBill', methods=['POST'])
@cross_origin()
def upload():
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
    title = request.form['Name']
    date_time = request.form['Date']
    description = request.form['Description']
    amount = request.form['Amount']
    category = request.form['category']
    # adding the transaction record
    insert_into_image_table(connection(), user_name, title, date_time, amount, description, mapped_file_name, category)

    # refresh the token, needs to be added to other API Calls
    refresh_token(connection(), request.form['username'])

    return jsonify({'uploadStatus': True})
