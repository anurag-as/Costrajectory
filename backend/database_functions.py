import sqlite3
from utilities.utils import hash_password


# Connecting to the database
def connection():
    db_connection = sqlite3.connect('costrajectory.db')
    db_connection.commit()
    try:
        create_user_table(db_connection)
    except:
        pass
    return db_connection


# Closing the connection to a database
def end_connection(db_connection):
    db_connection.close()
    db_connection.commit()


# Creating the user and password table
def create_user_table(db_connection):
    db_connection.execute('''CREATE TABLE USERS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         password           TEXT     NOT NULL);''')
    print("User Table created successfully")
    db_connection.commit()


# Inserting Entry into User Table
def insert_into_user_table(db_connection, username, password):
    password = hash_password(password)
    db_connection.execute('''INSERT INTO USERS (username, password) VALUES ("{username}","{password}")'''
                          .format(username=username, password=password))
    print("User entry inserted into table")
    db_connection.commit()


# Querying all users from the user table
def query_all_records(db_connection):
    cursor = db_connection.execute("SELECT * FROM USERS")
    for row in cursor:
        print(row[1])
    db_connection.commit()


def get_all_records(db_connection):
    cursor = db_connection.execute("SELECT * FROM TOKENS")
    out = [row[1] for row in cursor]
    db_connection.commit()
    return list(set(out))


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


# Creating the user and password table
def create_image_uploads(db_connection):
    db_connection.execute('''CREATE TABLE IMAGES
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         description        TEXT    NOT NULL);''')
    print("Image Table created successfully")
    db_connection.commit()


# function to add image upload entries into IMAGES table for query and download
def insert_into_image_table(db_connection, username, datetime, description):
    db_connection.execute('''INSERT INTO IMAGES (username, datetime, description) VALUES ("{username}","{datetime}",
    "{description}")'''.format(username=username, datetime=datetime, description=description))
    print("Image entry inserted into table")
    db_connection.commit()


# function to create token database
def create_token_table(db_connection):
    db_connection.execute('''CREATE TABLE TOKENS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         token        TEXT    NOT NULL);''')
    print("Token Table created successfully")
    db_connection.commit()


# function to insert tokens into table
def insert_into_token_table(db_connection, username, datetime, token):
    db_connection.execute('''INSERT INTO TOKENS (username, datetime, token) VALUES ("{username}","{datetime}",
    "{token}")'''.format(username=username, datetime=datetime, token=token))
    print("Token entry inserted into table")
    db_connection.commit()


# function to get the hashed password for the particular user
def get_datetime_token(db_connection, username, token):
    cursor = db_connection.execute('''SELECT datetime FROM TOKENS where username = "{username}" AND token = "{token}"
    LIMIT 1'''.format(username=username, token=token))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to map the file name and image name
def create_image_mapping_table(db_connection):
    db_connection.execute('''CREATE TABLE IMAGEMAPPING
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         original_name           TEXT    NOT NULL,
         mapped_name        TEXT    NOT NULL);''')
    print("Image mapping Table created successfully")
    db_connection.commit()


# function to insert into IMAGEMAPPING into table
def insert_into_token_table(db_connection, username, original, mapped):
    db_connection.execute('''INSERT INTO IMAGEMAPPING (username, original_name, mapped_name) VALUES ("{username}","{original}",
    "{mapped}")'''.format(username=username, original=original, mapped=mapped))
    print("Image Mapping entry inserted into table")
    db_connection.commit()

