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
         (ID INT PRIMARY KEY     NOT NULL,
         username           TEXT    NOT NULL,
         password           TEXT     NOT NULL);''')
    print("User Table created successfully")


