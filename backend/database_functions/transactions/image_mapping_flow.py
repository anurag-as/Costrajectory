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
