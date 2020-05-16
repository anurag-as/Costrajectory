# Check if a particular user exists
def user_exists(db_connection, username):
    cursor = db_connection.execute('''SELECT username FROM USERS where username = "{username}" LIMIT 1'''.
                                   format(username=username))
    for row in cursor:
        if row:
            return True
    return False


# function to get the hashed password for the particular user
def get_password(db_connection, username):
    cursor = db_connection.execute('''SELECT password FROM USERS where username = "{username}" LIMIT 1'''.
                                   format(username=username))
    for row in cursor:
        if row:
            return row[0]
    return False
