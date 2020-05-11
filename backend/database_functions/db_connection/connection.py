from sqlite3 import connect


# Connecting to the database
def connection():
    db_connection = connect('costrajectory.db')
    db_connection.commit()
    return db_connection


# Closing the connection to a database
def end_connection(db_connection):
    db_connection.commit()
    db_connection.close()

