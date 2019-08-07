from database_functions import *


class SignUp:

    # Initializing the connection
    def __init__(self, username):
        self.db = connection()
        self.user = username

    def check_user(self):
        return user_exists(self.db, self.user)

