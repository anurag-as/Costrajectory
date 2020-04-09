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
from api.auth.go_premium import goPremiumAPI
from api.account.profile import profileDetailsAPI
from api.transactions.logs import recentLogsAPI
from api.groups.create_group import createGroupApi
from api.groups.change_group_admin import changeGroupAdminApi
from api.groups.pending_group_requests import pendingRequestsApi
from api.groups.group_status_request import groupStatusAPI
from api.groups.delete_group import deleteGroupAPI
from api.groups.exit_group import exitGroupApi


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
app.register_blueprint(goPremiumAPI)
app.register_blueprint(profileDetailsAPI)
app.register_blueprint(recentLogsAPI)
app.register_blueprint(createGroupApi)
app.register_blueprint(changeGroupAdminApi)
app.register_blueprint(pendingRequestsApi)
app.register_blueprint(groupStatusAPI)
app.register_blueprint(deleteGroupAPI)
app.register_blueprint(exitGroupApi)


if __name__ == '__main__':
    download_db()
    app.run(port=5000, debug=True)
