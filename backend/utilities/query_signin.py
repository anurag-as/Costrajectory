from utilities.utils import verify_password
from database_functions.db_connection.connection import connection
from database_functions.account.sign_up_flow import user_exists, get_password


class SignIn:

    # Initializing the connection
    def __init__(self, username, password=None):
        self.db = connection()
        self.user = username
        self.password = password

    # check if user exists
    def check_user(self):
        return user_exists(self.db, self.user)

    # check password
    def check_password(self):
        if self.check_user():
            hashed_password = get_password(self.db, self.user)
            if verify_password(hashed_password, self.password):
                return "User successfully authenticated"
            return "Incorrect password, please try again"
