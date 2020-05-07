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


# function to add a column bill ids to groups table
def add_bill_ids(db_connection):
    db_connection.execute('''ALTER TABLE GROUPS ADD COLUMN
                              bill_ids TEXT;''')
    db_connection.commit()


# Creating the group bills table
def create_group_bills_table(db_connection):
    db_connection.execute('''CREATE TABLE GROUP_BILLS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         uploader           TEXT    NOT NULL,
         title              TEXT    NOT NULL,
         datetime           TEXT    NOT NULL,
         amount             TEXT    NOT NULL,
         description        TEXT    NOT NULL,
         image_name         TEXT    NOT NULL,
         category           TEXT    NOT NULL,
         share              TEXT    NOT NULL,
         payer              TEXT    NOT NULL,
         group_id           TEXT    NOT NULL);''')
    db_connection.commit()


# function to add a column group_creation_time to groups table
def add_group_creation_time(db_connection):
    db_connection.execute('''ALTER TABLE GROUPS ADD COLUMN
                              creation_time TEXT;''')
    db_connection.commit()


# function to add a column pending users to groups table
def add_column_pending_users(db_connection):
    db_connection.execute('''ALTER TABLE GROUPS ADD COLUMN
                              pending_users TEXT;''')
    db_connection.commit()


# function to add a column pending_state_machine to PENDING_Requests table
def add_pending_state_machine(db_connection):
    db_connection.execute('''ALTER TABLE PENDING_REQUESTS ADD COLUMN
                              pending_state_machine INTEGER;''')
    db_connection.commit()
