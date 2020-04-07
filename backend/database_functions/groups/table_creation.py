# function to create group table for cost sharing
def create_group_users_table(db_connection):
    db_connection.execute('''CREATE TABLE GROUPS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         group_admin           TEXT    NOT NULL,
         users                 TEXT    NOT NULL,
         title                 TEXT    NOT NULL,
         description           TEXT);''')
    db_connection.commit()


# function to create table for pending group requests
def create_pending_requests_table(db_connection):
    db_connection.execute('''CREATE TABLE PENDING_REQUESTS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         group_id              TEXT    NOT NULL,
         username              TEXT    NOT NULL,
         status                TEXT    NOT NULL);''')
    db_connection.commit()
