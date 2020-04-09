# Creating the username alias table
def create_user_table(db_connection):
    db_connection.execute('''CREATE TABLE USERNAME_ALIAS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         alias              TEXT     NOT NULL);''')
    db_connection.commit()


#  adding an alias to a username
def add_alias(db_connection, username, alias):
    db_connection.execute('''INSERT INTO USERNAME_ALIAS (username, alisa) VALUES ("{username}","{alias}")'''
                          .format(username=username, alias=alias))
    db_connection.commit()
