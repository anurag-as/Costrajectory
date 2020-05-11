from ast import literal_eval
from yaml import safe_load
from utilities.api_utils import get_alias
from database_functions.account.profile_details_flow import get_name
from database_functions.account.username_alias import get_user_alias, add_alias
from api.account.profile import form_username_alias


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
    AND status = "{status}" and group_id="{group_id}"
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


# function to get the pending groups for a particular username
def get_groups_user(db_connection, username, status):
    cursor = db_connection.execute('''SELECT group_id FROM PENDING_REQUESTS where username="{username}" and status="{status}"
    '''.format(username=username, status=status))
    groups = []
    for row in cursor:
        if row:
            groups.append(row[0])
    db_connection.commit()
    return groups


# function to get all the group information for a particular group
def get_group_info(db_connection, group_id):
    cursor = db_connection.execute('''SELECT ID,group_admin,users,title,description, bill_ids, creation_time,
    pending_users FROM 
    GROUPS where ID = "{group_id}"  
        '''.format(group_id=group_id))
    for row in cursor:
        if row:
            try:
                list_users = literal_eval(row[2])
                list_bills = literal_eval(row[5])
                list_pending_users = literal_eval(row[7])
                group_info = {'group_id': row[0], 'group_admin': row[1],
                              'users': list_users, 'title': row[3], 'description': row[4],
                              'bills': list_bills, 'creation_time': row[6],
                              'pending_users': list_pending_users}
                return group_info
            except:
                continue
    return False


# function to get the bill_ids for a group_id
def get_groups_bills(db_connection, group_id):
    cursor = db_connection.execute('''SELECT bill_ids FROM GROUPS where ID="{group_id}" 
    '''.format(group_id=group_id))
    for row in cursor:
        if row:
            return row[0]
    db_connection.commit()
    return False


# function to get data of a bill
def get_bill_data(db_connection, bill_id):
    cursor = db_connection.execute('''SELECT ID,uploader,title,datetime,amount,description,image_name,category,share,
    payer,group_id FROM GROUP_BILLS where ID="{bill_id}" 
        '''.format(bill_id=bill_id))
    for row in cursor:
        if row:
            share = safe_load(row[8])
            bill_info = {'bill_id': row[0], 'uploader': row[1],
                         'title': row[2], 'datetime': row[3], 'amount': row[4],
                         'description': row[5], 'image_name': row[6],
                         'category': row[7], 'share': share,
                         'payer': row[9], 'group_id': row[10]}
            return bill_info
    db_connection.commit()
    return False


# function to get bill name
def get_bill_name(db_connection, bill_id):
    cursor = db_connection.execute('''SELECT title FROM GROUP_BILLS where ID="{bill_id}" 
        '''.format(bill_id=bill_id))
    for row in cursor:
        if row:
            return row[0]
    db_connection.commit()
    return False


# function to get user names and aliases
def get_user_details(db_connection, users):
    payload = []
    for each_user in users:
        username = each_user
        name = get_name(db_connection, username)
        alias = get_user_alias(db_connection, username)
        if not alias:
            if name:
                alias = form_username_alias(name[0], name[1]).upper()
            else:
                alias = get_alias(username).upper()
            add_alias(db_connection, username, alias)
        if name:
            full_name = " ".join(name)
        else:
            full_name = False
        user_detail = {'username': username, 'name': full_name, "alias": alias}
        payload.append(user_detail)
    return payload


# function to get the pending users of the group
def get_group_pending_users(db_connection, group_id):
    cursor = db_connection.execute('''SELECT pending_users FROM GROUPS where ID = "{group_id}"  
    '''.format(group_id=group_id))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to get the pending state machine for user and group
def get_group_pending_state_machine(db_connection, username, group_id):
    cursor = db_connection.execute('''SELECT pending_state_machine FROM PENDING_REQUESTS  
    where username="{username}" and group_id="{group_id}"  
    '''.format(group_id=group_id, username=username))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to get the status for group_id and user in admin approvals table
def get_group_admin_approval(db_connection, user, group_id):
    cursor = db_connection.execute('''SELECT status FROM ADMIN_APPROVALS  
    where user="{user}" and group_id="{group_id}"  
    '''.format(group_id=group_id, user=user))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to get the pending approvals for admin
def get_pending_admin_approvals(db_connection, admin):
    cursor = db_connection.execute('''SELECT type, user, group_title, group_id FROM ADMIN_APPROVALS 
    where admin = "{admin}" 
    AND status = "awaiting"
    '''.format(admin=admin))
    approvals = {'add':[], 'remove':[]}
    for row in cursor:
        if row:
            if row[0] == 'add':
                approvals['add'].append([{'type': row[0], 'username': row[1], 'group_title':row[2],
                                          'group_id': row[3]}])
            else:
                approvals['remove'].append([{'type': row[0], 'username': row[1], 'group_title': row[2],
                                          'group_id': row[3]}])
    db_connection.commit()
    return approvals if approvals else "False"
