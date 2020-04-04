from utilities.api_utils import get_readable_date_time


# function to create recent logs database
def create_recent_logs_table(db_connection):
    db_connection.execute('''CREATE TABLE RECENTS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         type               TEXT    NOT NULL,
         title              TEXT    NOT NULL);''')
    db_connection.commit()


# function to insert recent logs into table
def insert_into_recent_table(db_connection, username, datetime, type_of_transaction, title):
    db_connection.execute('''INSERT INTO RECENTS (username, datetime, type, title) VALUES ("{username}","{datetime}",
    "{type}", "{title}")'''.format(username=username, datetime=datetime, type=type_of_transaction, title=title))
    db_connection.commit()


# function to get the hashed password for the particular user
def get_recent_logs(db_connection, username, limit=10):
    cursor = db_connection.execute('''SELECT datetime, type, title FROM RECENTS where username = "{username}"  
    order by cast(datetime as unsigned) DESC
    LIMIT "{limit}"'''.format(username=username, limit=limit))
    transactions = []
    for row in cursor:
        if row:
            transaction = list(row)
            transaction[0] = get_readable_date_time(transaction[0])
            transactions.append(transaction)
    return transactions if transactions else "False"
