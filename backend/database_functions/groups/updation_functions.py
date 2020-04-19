# function to change group admin
def change_group_admin(db_connection, group_id, group_admin):
    db_connection.execute('''UPDATE GROUPS SET  group_admin="{group_admin}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, group_admin=group_admin))
    db_connection.commit()
    return True


# function to change group status for a username and group_id
def update_group_status(db_connection, group_id, username, status):
    db_connection.execute('''UPDATE PENDING_REQUESTS SET status="{status}"
                            WHERE group_id="{group_id}" AND username="{username}"'''
                          .format(group_id=group_id, username=username, status=status))
    db_connection.commit()
    return True


# function to add new users to the group
def add_new_users_group(db_connection, group_id, users):
    db_connection.execute('''UPDATE GROUPS SET  users="{users}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, users=users))
    db_connection.commit()
    return True


# function to add a new bill id to a group
def add_new_bill_id(db_connection, group_id, bill_ids):
    db_connection.execute('''UPDATE GROUPS SET  bill_ids="{bill_ids}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, bill_ids=bill_ids))
    db_connection.commit()
    return True
