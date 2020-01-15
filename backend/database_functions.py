import sqlite3

# Connecting to the database
import pandas as pd
from utilities.utils import hash_password


def connection():
    db_connection = sqlite3.connect('costracjectory.db')
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
    cursor = db_connection.execute("SELECT * FROM USERS")
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


