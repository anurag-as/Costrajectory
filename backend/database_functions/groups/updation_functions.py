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
