from ast import literal_eval
from database_functions.groups.updation_functions import add_new_bill_id


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


# function to delete a group bill
def delete_from_group_bills_table(db_connection, bill_id):
    db_connection.execute('''DELETE FROM GROUP_BILLS WHERE ID="{bill_id}"'''
                          .format(bill_id=bill_id))
    db_connection.commit()
    return True


# function to delete bill entry from groups table
def delete_from_groups_table(db_connection, bill_id, group_id):
    cursor = db_connection.execute('''SELECT bills FROM GROUP_BILLS where ID="{group_id}" 
            '''.format(group_id=group_id))
    for row in cursor:
        if row:
            list_bills = literal_eval(row[0])
            break

    if list_bills:
        list_bills.remove(bill_id)
        add_new_bill_id(db_connection, group_id, list_bills)
    db_connection.commit()
    return True
