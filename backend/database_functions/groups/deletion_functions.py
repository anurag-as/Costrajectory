# function to delete a group
def delete_group(db_connection, group_id):
    db_connection.execute('''DELETE FROM GROUPS WHERE ID="{group_id}"'''
                          .format(group_id=group_id))
    db_connection.commit()
    return True


# function to delete user entries from groups
def delete_users_in_group(db_connection, group_id):
    db_connection.execute('''DELETE FROM PENDING_REQUESTS WHERE group_id="{group_id}"'''
                          .format(group_id=group_id))
    db_connection.commit()
    return True
