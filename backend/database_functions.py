from sqlite3 import connect
from utilities.utils import hash_password
from time import time


# Connecting to the database
def connection():
    db_connection = connect('costrajectory.db')
    db_connection.commit()
    try:
        create_user_table(db_connection)
    except:
        pass
    return db_connection


# Closing the connection to a database
def end_connection(db_connection):
    db_connection.commit()
    db_connection.close()


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
         title              TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         amount             TEXT    NOT NULL,
         description        TEXT    NOT NULL,
         image_name         TEXT    NOT NULL,
         category           TEXT    NOT NULL);''')
    db_connection.commit()


# function to add image upload entries into IMAGES table for query and download
def insert_into_image_table(db_connection, username, title, datetime, amount, description, image_name, category):
    db_connection.execute('''INSERT INTO IMAGES (username, title, datetime, amount, description, image_name, category) 
        VALUES ("{username}","{title}","{datetime}","{amount}","{description}","{image_name}","{category}")'''
                          .format(username=username, title=title, datetime=datetime, amount=amount,
                                  description=description, image_name=image_name, category=category
                                  ))
    db_connection.commit()


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


# function to map the file name and image name
def create_image_mapping_table(db_connection):
    db_connection.execute('''CREATE TABLE IMAGEMAPPING
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         username           TEXT    NOT NULL,
         original_name           TEXT    NOT NULL,
         mapped_name        TEXT    NOT NULL);''')
    db_connection.commit()


# function to insert into IMAGEMAPPING into table
def insert_into_image_mapping_table(db_connection, username, original, mapped):
    db_connection.execute('''INSERT INTO IMAGEMAPPING (username, original_name, mapped_name) VALUES ("{username}","{original}",
    "{mapped}")'''.format(username=username, original=original, mapped=mapped))
    db_connection.commit()


# function to get the original image name from the mapped name
def get_original_name(db_connection, username, mapped_name):
    cursor = db_connection.execute('''SELECT original_name FROM IMAGEMAPPING where username = "{username}" AND mapped_name
     = "{mapped}"
    LIMIT 1'''.format(username=username, mapped=mapped_name))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to get the latest token for the particular user
def get_latest_token(db_connection, username):
    cursor = db_connection.execute('''SELECT token FROM TOKENS where username = "{username}" 
    order by cast(datetime as unsigned) DESC
    LIMIT 1'''.format(username=username))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to refresh the token for a particular user
def refresh_token(db_connection, username):
    latest_token = get_latest_token(db_connection, username)
    if not latest_token:
        return False
    new_date_time = str(time())
    db_connection.execute('''UPDATE TOKENS 
        set datetime = "{new_date_time}"
        where username = "{username}" AND token = "{token}" 
        '''.format(username=username, token=latest_token, new_date_time=new_date_time))
    db_connection.commit()
    return True


# function to query recent transactions of a particular user
# limit has also been introduced to enhance the functionality and for future user
def query_recent_transaction(db_connection, username, limit=5):
    cursor = db_connection.execute('''SELECT title, datetime, amount, description, image_name, ID, category
      FROM IMAGES where username = "{username}"
    LIMIT {limit}'''.format(username=username, limit=limit))
    transactions = []  # list of recent transactions
    for row in cursor:
        if row:
            transactions.append(list(row))
    return transactions if transactions else "False"


# function to delete a particular transaction
def delete_from_image_table(db_connection, uid, username):
    cursor = db_connection.execute('''DELETE from IMAGES where ID = "{uid}" AND username = "{username}"'''.
                                   format(username=username, uid=uid))
    db_connection.commit()
    return "Transaction successfully deleted"


# function to edit the transactions
def edit_transactions_image_table(db_connection, uid, username, title, datetime, amount, description, image_name,
                                  category):
    db_connection.execute('''UPDATE IMAGES SET  title="{title}",
                                                datetime="{datetime}",
                                                amount="{amount}",
                                                description="{description}",
                                                image_name="{image_name}",
                                                category="{category}"
                            WHERE username="{username}" AND
                                  ID="{uid}"'''
                          .format(uid=uid, username=username, title=title, datetime=datetime, amount=amount,
                                  description=description, image_name=image_name, category=category
                                  ))
    db_connection.commit()
    return "Transaction Updated Successfully"


# function to add a column to IMAGES table
def add_category(db_connection):
    db_connection.execute('''ALTER TABLE IMAGES ADD
                             category TEXT;''')
    db_connection.commit()


# function to map the file name and file_size
def create_image_size_table(db_connection):
    db_connection.execute('''CREATE TABLE IMAGE_SIZE
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         mapped_name           TEXT    NOT NULL,
         file_size           TEXT    NOT NULL);''')
    db_connection.commit()


# function to insert into image_size into table
def insert_into_image_size_table(db_connection, mapped, size):
    db_connection.execute('''INSERT INTO IMAGE_SIZE (mapped_name, file_size) VALUES ("{mapped}","{size}")'''
                          .format(size=size, mapped=mapped))
    db_connection.commit()


# function to calculate total space consumed by user in server
def space_usage(db_connection, username):
    cursor = db_connection.execute('''SELECT image_name
          FROM IMAGES where username = "{username}"
    '''.format(username=username))
    sizes = []  # list of image sizes
    for row in cursor:
        if row[0] != "False":
            cursor1 = db_connection.execute('''SELECT file_size
                      FROM IMAGE_SIZE where mapped_name = "{image_name}"
                '''.format(image_name=row[0]))
            for row1 in cursor1:
                sizes.append(float(row1[0]))
    return sum(sizes) if sizes else 0


# function to add a column premium to users table
def add_premium(db_connection):
    db_connection.execute('''ALTER TABLE USERS ADD
                             category premium;''')
    db_connection.commit()


# function to check if a particular user is Premium
def is_user_premium(db_connection, username):
    cursor = db_connection.execute('''SELECT premium FROM USERS where username = "{username}"
     LIMIT 1'''.format(username=username))
    for row in cursor:
        if row:
            return row[0]
    return -1
