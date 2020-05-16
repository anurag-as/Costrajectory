# Creating the username alias table
def create_user_table(db_connection):
    db_connection.execute('''CREATE TABLE USERNAME_ALIAS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         alias              TEXT     NOT NULL);''')
    db_connection.commit()


#  adding an alias to a username
def add_alias(db_connection, username, alias):
    db_connection.execute('''INSERT INTO USERNAME_ALIAS (username, alias) VALUES ("{username}","{alias}")'''
                          .format(username=username, alias=alias))
    db_connection.commit()


# function to update alias based on when profile details is updated
def update_alias(db_connection, username, alias):
    db_connection.execute('''UPDATE USERNAME_ALIAS 
        set alias = "{alias}"
        where username = "{username}"  
        '''.format(username=username, alias=alias))
    db_connection.commit()
    return True


# function to get the alias for a particular username
def get_user_alias(db_connection, username):
    cursor = db_connection.execute('''SELECT alias FROM USERNAME_ALIAS 
            where username = "{username}"  
            '''.format(username=username))
    for row in cursor:
        if row:
            return row[0]
    db_connection.commit()
    return False
