# function to create table for bug reporting
def create_bugs_table(db_connection):
    db_connection.execute('''CREATE TABLE BUGS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
         title                 TEXT,
         description           TEXT,
         creation_time         TEXT);''')
    db_connection.commit()


# function to add new bugs and return bug id
def new_bugs(db_connection, title, description, creation_time):
    db_cursor = db_connection.cursor()
    db_cursor.execute('''INSERT INTO BUGS (title, description, creation_time) 
        VALUES ("{title}","{description}", "{creation_time}")'''
                      .format(title=title, description=description, creation_time=creation_time))
    bug_id = str(db_cursor.lastrowid)
    db_connection.commit()
    return bug_id
