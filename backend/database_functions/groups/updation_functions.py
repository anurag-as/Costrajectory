# function to change group admin
def change_group_admin(db_connection, group_id, group_admin):
    db_connection.execute('''UPDATE GROUPS SET  group_admin="{group_admin}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, group_admin=group_admin))
    db_connection.commit()
    return True


# function to change group rejected status to pending for a username and group_id
def update_rejected_to_pending(db_connection, group_id, username):
    db_connection.execute('''UPDATE PENDING_REQUESTS SET status="pending"
                            WHERE ID="{group_id}" AND username="{username}"'''
                          .format(group_id=group_id, username=username))
    db_connection.commit()
    return True
