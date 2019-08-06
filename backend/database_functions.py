import sqlite3


# Connecting to the database
def connection():
    db_connection = sqlite3.connect('costracjectory.db')
    return db_connection


# Closing the connection to a database
def end_connection(db_connection):
    db_connection.close()


# Creating the user and password table
def create_user_table(db_connection):
    db_connection.execute('''CREATE TABLE USERS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         password           TEXT     NOT NULL);''')
    print("User Table created successfully")


# Inserting Entry into User Table
def insert_into_user_table(db_connection, username, password):
    db_connection.execute('''INSERT INTO USERS (username, password) VALUES ("username","password")'''
                          .format(username=username, password=password))
    print("User entry inserted into table")


db = connection()
