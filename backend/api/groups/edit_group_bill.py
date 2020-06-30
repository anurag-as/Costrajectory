from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.groups.updation_functions import edit_group_bill
from database_functions.transactions.image_mapping_flow import insert_into_image_mapping_table
from database_functions.account.token_auth_flow import refresh_token
from database_functions.transactions.image_size_flow import insert_into_image_size_table
from database_functions.logs.recentLogs import insert_into_recent_table
from ast import literal_eval
from utilities.upload import uploadFile
from os import SEEK_END

editGroupBillAPI = Blueprint('editGroupBillAPI', __name__)


# API to edit a particular transaction based on uid
@editGroupBillAPI.route('/groups/editGroupTransaction', methods=['POST'])
@cross_origin()
def edit_group_bill_api():
    try:
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
        title = request.form['title']
        date_time = request.form['date']
        description = request.form['description']
        amount = request.form['amount']
        category = request.form['category']
        payer = request.form['payer']
        group_id = request.form['group_id']
        shares = request.form['shares']
        bill_id = request.form['bill_id']


        # editing the transaction record
        edit_group_bill(connection(), title, date_time, amount, description,
                        mapped_file_name, category, shares, payer, group_id, bill_id)

        # refresh the token, needs to be added to other API Calls
        refresh_token(connection(), request.form['username'])

        message = "You added a group bill "
        message_description = {'Title': title,
                               'DateTime': date_time,
                               'Description': description,
                               'Amount': amount,
                               'Category': category,
                               'Payer': payer,
                               'Shares': shares,
                               'Group': title
                               }
        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "12:Edit Group Bill " + title,
                                 message + str(message_description))

        return jsonify({'editStatus': True})
    except:
        return jsonify(False)
