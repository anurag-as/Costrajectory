import sqlite3


# function to create new groups and returning group id
def insert_into_group_table(db_connection, group_admin, users, title, description):
    db_cursor = db_connection.cursor()
    db_cursor.execute('''INSERT INTO GROUPS (group_admin, users, title, description) 
        VALUES ("{group_admin}","{users}","{title}","{description}")'''
                          .format(group_admin=group_admin, users=users, title=title, description=description))

    group_id = str(db_cursor.lastrowid)
    db_connection.commit()
    return group_id


# function to add the users to pending requests table
def insert_into_pending_requests_table(db_connection, username, group_id, status):
    db_connection.execute('''INSERT INTO PENDING_REQUESTS (username, group_id, status) 
        VALUES ("{username}","{group_id}","{status}")'''
                          .format(username=username, group_id=group_id, status=status))
    db_connection.commit()
