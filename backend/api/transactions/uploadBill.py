from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.account.premium_flow import is_user_premium
from database_functions.transactions.create_bill import insert_into_image_table
from database_functions.transactions.image_mapping_flow import insert_into_image_mapping_table
from database_functions.transactions.image_size_flow import insert_into_image_size_table
from database_functions.account.token_auth_flow import refresh_token
from database_functions.account.space_flow import space_usage, group_space_usage
from os import SEEK_END
from utilities.upload import uploadFile
from utilities.utils import get_total_size
from database_functions.logs.recentLogs import insert_into_recent_table


uploadBillAPI = Blueprint('uploadBillAPI', __name__)


def quota_exceeded(size, total_quota):
    """
    Function to check if quota has been exceeded
    :param size: Current Usage
    :param total_quota: Total Quota for that user
    :return: If user has exceeded his quota
    """
    return int(size) >= int(total_quota)


# API to add a new transaction
# Legacy version - Uploading a bill, hence the name
# Later version - Adding a new transaction
@uploadBillAPI.route('/transactions/uploadBill', methods=['POST'])
@cross_origin()
def upload():
    try:
        usage_exceeded = None
        if 'image' in request.files:
            # Image has to be uploaded
            file = request.files['image']
            file_name = file.filename

            # If user quota has been exceeded
            user_name = request.form['username']
            size = space_usage(connection(), user_name) + group_space_usage(connection(), user_name)

            bool_is_user_premium = is_user_premium(connection(), user_name)
            premium = False
            if bool_is_user_premium == 'True':
                premium = True
            total_quota = get_total_size(premium)

            usage_exceeded = quota_exceeded(size, total_quota)
            if not usage_exceeded:  # Upload image if user has not exceeded his quota
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
                mapped_file_name = str(False)
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

        message_description = {'Title': title,
                               'DateTime': date_time,
                               'Description': description,
                               'Amount': amount,
                               'Category': category,
                               }
        message = "You added a new bill "
        # adding transaction to logs
        insert_into_recent_table(connection(), user_name, str(time()), "22:Added Transaction " + title,
                                 message + str(message_description))

        # refresh the token, needs to be added to other API Calls
        refresh_token(connection(), request.form['username'])
        if usage_exceeded is not None and usage_exceeded:
            message = "User Quota Exceeded"
            return jsonify({'uploadStatus': True, 'message': message})
        return jsonify({'uploadStatus': True})
    except:
        return jsonify(False)
