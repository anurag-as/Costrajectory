# function to add a column premium to users table
def add_premium(db_connection):
    db_connection.execute('''ALTER TABLE USERS ADD
                             category premium;''')
    db_connection.commit()


# function to check if a particular user is Premium
def is_user_premium(db_connection, username):
    cursor = db_connection.execute('''SELECT premium FROM USERS where username = "{username}"
     LIMIT 1'''.format(username=username))
    for row in cursor:
        if row:
            return row[0]
    return -1


# function to make a user premium
def user_go_premium(db_connection, username):
    db_connection.execute('''UPDATE USERS 
        set premium = "True"
        where username = "{username}"
        '''.format(username=username, ))
    db_connection.commit()
    return True

