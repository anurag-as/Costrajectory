# coding: utf-8

# imports
from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api
from utilities.download import download_db

# API Imports
from api.auth.checkUser import checkUserAPI
from api.auth.registerUser import registerUserAPI
from api.auth.checkValid import checkValidTokenAPI
from api.auth.signIn import signInAPI
from api.transactions.uploadBill import uploadBillAPI
from api.transactions.recentTransactions import recentTransactionsAPI
from api.transactions.previewImage import previewImageAPI
from api.auth.signOut import signOutAPI
from api.transactions.deleteTransaction import deleteTransactionsAPI
from api.transactions.editTransaction import editBillAPI
from api.analytics.usage import usageAPI
from api.auth.profile_pic import profilePicApi
from api.auth.is_premium import isPremiumAPI

# Flask APP
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

# API Blueprints
app.register_blueprint(checkUserAPI)
app.register_blueprint(registerUserAPI)
app.register_blueprint(checkValidTokenAPI)
app.register_blueprint(signInAPI)
app.register_blueprint(uploadBillAPI)
app.register_blueprint(recentTransactionsAPI)
app.register_blueprint(previewImageAPI)
app.register_blueprint(signOutAPI)
app.register_blueprint(deleteTransactionsAPI)
app.register_blueprint(editBillAPI)
app.register_blueprint(usageAPI)
app.register_blueprint(profilePicApi)
app.register_blueprint(isPremiumAPI)


if __name__ == '__main__':
    download_db()
    app.run(port=5000, debug=True)
