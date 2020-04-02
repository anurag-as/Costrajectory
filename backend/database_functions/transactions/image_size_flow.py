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

