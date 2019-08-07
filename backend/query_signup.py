from database_functions import *


class SignUp:

    # Initializing the connection
    def __init__(self, username, password):
        self.db = connection()
        self.user = username
        self.password = password

    # check if user exists
    def check_user(self):
        return user_exists(self.db, self.user)

    # add a user into user table
    def add_user(self):
        if not self.check_user():
            insert_into_user_table(self.db, self.user, self.password)
            return True
        return False
