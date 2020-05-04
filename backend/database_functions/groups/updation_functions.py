from database_functions.groups.querying_functions import get_group_pending_users
from ast import literal_eval


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


# function to edit the transactions
def edit_group_bill(db_connection, title, datetime, amount, description,
                                  image_name, category, share, payer, group_id, bill_id):
    db_connection.execute('''UPDATE GROUP_BILLS SET  title="{title}",
                                                share="{share}", 
                                                payer="{payer}", 
                                                datetime="{datetime}",
                                                amount="{amount}",
                                                description="{description}",
                                                image_name="{image_name}",
                                                category="{category}"
                                                WHERE ID="{bill_id}" AND group_id="{group_id}"'''
                          .format(title=title, datetime=datetime, amount=amount,
                                  description=description, image_name=image_name, category=category, share=share,
                                  payer=payer, bill_id=bill_id, group_id=group_id
                                  ))
    db_connection.commit()
    return True


# function to add new set of pending users to the group
def add_new_pending_users_group(db_connection, group_id, pending_users):
    db_connection.execute('''UPDATE GROUPS SET  pending_users="{pending_users}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, pending_users=pending_users))
    db_connection.commit()
    return True


# function to remove the user from pending -> either user has accepted or rejected the group
def remove_user_from_pending(db_connection, group_id, username):
    pending_users = get_group_pending_users(db_connection, group_id)
    new_pending_users = literal_eval(pending_users)
    new_pending_users.remove(username)
    new_pending_users = str(new_pending_users)
    db_connection.execute('''UPDATE GROUPS SET pending_users="{new_pending_users}"
                            WHERE ID="{group_id}"'''
                          .format(group_id=group_id, new_pending_users=new_pending_users))
    db_connection.commit()
    return True
