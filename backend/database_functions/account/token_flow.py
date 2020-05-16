# function to create token database
def create_token_table(db_connection):
    db_connection.execute('''CREATE TABLE TOKENS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         token        TEXT    NOT NULL);''')
    db_connection.commit()


# function to insert tokens into table
def insert_into_token_table(db_connection, username, datetime, token):
    db_connection.execute('''INSERT INTO TOKENS (username, datetime, token) VALUES ("{username}","{datetime}",
    "{token}")'''.format(username=username, datetime=datetime, token=token))
    db_connection.commit()


# function to get the hashed password for the particular user
def get_datetime_token(db_connection, username, token):
    cursor = db_connection.execute('''SELECT datetime FROM TOKENS where username = "{username}" AND token = "{token}" 
    order by cast(datetime as unsigned) DESC
    LIMIT 1'''.format(username=username, token=token))
    for row in cursor:
        if row:
            return row[0]
    return False
