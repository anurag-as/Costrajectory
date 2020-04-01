from utilities.utils import hash_password


# Creating the user and password table
def create_user_table(db_connection):
    db_connection.execute('''CREATE TABLE USERS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         password           TEXT     NOT NULL);''')
    db_connection.commit()


# Inserting Entry into User Table
def insert_into_user_table(db_connection, username, password, premium):
    password = hash_password(password)
    db_connection.execute('''INSERT INTO USERS (username, password, premium) VALUES ("{username}","{password}",
    "{premium}") '''
                          .format(username=username, password=password, premium=premium))
    db_connection.commit()
