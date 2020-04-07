# function to add image upload entries into IMAGES table for query and download
def insert_into_group_table(db_connection, group_admin, users, title, description):
    db_connection.execute('''INSERT INTO GROUPS (group_admin, users, title, description) 
        VALUES ("{group_admin}","{users}","{title}","{description}")'''
                          .format(group_admin=group_admin, users=users, title=title, description=description,))
    db_connection.commit()

