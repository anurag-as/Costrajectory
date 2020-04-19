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


# function to delete a particular transaction
def delete_from_image_table(db_connection, uid, username):
    cursor = db_connection.execute('''DELETE from IMAGES where ID = "{uid}" AND username = "{username}"'''.
                                   format(username=username, uid=uid))
    db_connection.commit()
    return "Transaction successfully deleted"


# function to edit the transactions
def edit_transactions_image_table(db_connection, uid, uploader, title, datetime, amount, description, image_name,
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


# function to get the bill title from uid
def get_bill_name(db_connection, uid):
    cursor = db_connection.execute('''SELECT title FROM IMAGES where ID = "{uid}"
    order by cast(datetime as unsigned) DESC
    LIMIT 1'''.format(uid=uid))
    for row in cursor:
        if row:
            return row[0]
    return False
