import sqlite3


# function to create new groups and returning group id
def insert_into_group_table(db_connection, group_admin, users, title, description, creation_time, pending_users):
    db_cursor = db_connection.cursor()
    db_cursor.execute('''INSERT INTO GROUPS (group_admin, users, title, description, bill_ids, creation_time, 
    pending_users) 
        VALUES ("{group_admin}","{users}","{title}","{description}", "[]", "{creation_time}","{pending_users}")'''
                      .format(group_admin=group_admin, users=users, title=title, description=description,
                              creation_time=creation_time, pending_users=pending_users))

    group_id = str(db_cursor.lastrowid)
    db_connection.commit()
    return group_id


# function to add the users to pending requests table
def insert_into_pending_requests_table(db_connection, group_id, username, status, pending_state_machine=0):
    db_connection.execute('''INSERT INTO PENDING_REQUESTS (username, group_id, status, pending_state_machine) 
        VALUES ("{username}","{group_id}","{status}", {pending_state_machine})'''
                          .format(username=username, group_id=group_id, status=status,
                                  pending_state_machine=pending_state_machine))
    db_connection.commit()


# function to add entries to group bills table
def insert_into_group_bills_table(db_connection, uploader, title, datetime, amount, description,
                                  image_name, category, share, payer, group_id):
    db_cursor = db_connection.cursor()
    db_cursor.execute('''INSERT INTO GROUP_BILLS (uploader, title, datetime, amount, description, image_name, 
    category, share, payer, group_id) 
        VALUES ("{uploader}","{title}","{datetime}","{amount}","{description}","{image_name}","{category}"
        ,"{share}", "{payer}", "{group_id}")'''
                      .format(uploader=uploader, title=title, datetime=datetime, amount=amount,
                              description=description, image_name=image_name, category=category,
                              share=share, payer=payer, group_id=group_id
                              ))
    bill_id = str(db_cursor.lastrowid)
    db_connection.commit()
    return bill_id

