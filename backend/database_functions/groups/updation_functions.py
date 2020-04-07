# function to change group admin
def change_group_admin(db_connection, group_id, group_admin):
    db_connection.execute('''UPDATE GROUPS SET  group_admin="{group_admin}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, group_admin=group_admin))
    db_connection.commit()
    return True
