# coding: utf-8

# imports
from flask import Flask, request
import base64
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask import jsonify
from query_signup import *
from query_signin import *
from flask_cors import CORS, cross_origin
from database_functions import *
import time
import shutil
from utilities.download import *
from utilities.utils import *
from utilities.upload import upload as upload_db
from utilities.upload import uploadFile
from utilities.delete_file import delete_file
from api_utils import *
from flask import send_file
import os

############ API Migration Imports
from flask import Flask
from api.auth.checkUser import checkUserAPI
from api.auth.registerUser import registerUserAPI
from api.auth.checkValid import checkValidTokenAPI
from api.auth.signIn import signInAPI
from api.transactions.uploadBill import uploadBillAPI
from api.transactions.recentTransactions import recentTransactionsAPI
from api.transactions.previewImage import previewImageAPI
from api.auth.signOut import signOutAPI
from api.transactions.deleteTransaction import deleteTransactionsAPI

app = Flask(__name__)
cors = CORS(app)
api = Api(app)

app.register_blueprint(checkUserAPI)
app.register_blueprint(registerUserAPI)
app.register_blueprint(checkValidTokenAPI)
app.register_blueprint(signInAPI)
app.register_blueprint(uploadBillAPI)
app.register_blueprint(recentTransactionsAPI)
app.register_blueprint(previewImageAPI)
app.register_blueprint(signOutAPI)
app.register_blueprint(deleteTransactionsAPI)


# API to edit a particular transaction based on uid
@app.route('/editTransaction', methods=['POST'])
@cross_origin()
def edit_transaction():
    if 'image' in request.files:
        # Image has to be uploaded
        file = request.files['image']
        file_name = file.filename
        file_extension = file_name.split('.')[-1]
        original_file_name = file_name
        present_time = str(time.time())
        file_name = present_time + '.' + file_extension
        mapped_file_name = file_name
        # adding image mapping for cross referencing later
        insert_into_image_mapping_table(connection(), request.form['username'], original_file_name, mapped_file_name)

        # uploading the file to dropbox
        uploadFile(file, mapped_file_name)

        file.seek(0, os.SEEK_END)
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


# API to get usage details for a particular user
@app.route('/usage', methods=['POST'])
@cross_origin()
def user_space_usage():
    """
    API for usage details
    """
    user_name = request.json['username']
    refresh_token(connection(), user_name)
    size = space_usage(connection(), user_name)
    total_quota = get_total_size()
    return jsonify({'TotalQuota': total_quota, 'UsedQuota': size})



if __name__ == '__main__':
    download()
    app.run(port=5000, debug=True)
