# function to get the pending groups for a particular username
def get_group_title(db_connection, group_id):
    cursor = db_connection.execute('''SELECT title FROM GROUPS where ID = "{group_id}"  
    '''.format(group_id=group_id))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to get the pending groups for a particular username
def get_pending_groups(db_connection, username):
    cursor = db_connection.execute('''SELECT group_id FROM PENDING_REQUESTS where username = "{username}" 
    AND status = "pending"
    '''.format(username=username))
    groups = []
    for row in cursor:
        if row:
            group_id = row[0]
            title = get_group_title(db_connection, group_id)
            groups.append([group_id, title])
    db_connection.commit()
    return groups if groups else "False"


# function to check if user has particular status in a group
'''
accepted
rejected
removed
pending
exited
'''


def get_status_for_group(db_connection, group_id, username, status):
    cursor = db_connection.execute('''SELECT group_id FROM PENDING_REQUESTS where username = "{username}" 
    AND status = "{status}" and ID="{group_id}"
    '''.format(username=username, status=status, group_id=group_id))
    for row in cursor:
        if row:
            return True
    return False


# function to get the current users of the group
def get_group_current_users(db_connection, group_id):
    cursor = db_connection.execute('''SELECT users FROM GROUPS where ID = "{group_id}"  
    '''.format(group_id=group_id))
    for row in cursor:
        if row:
            return row[0]
    return False
