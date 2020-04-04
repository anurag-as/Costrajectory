from time import time


# function to get the latest token for the particular user
def get_latest_token(db_connection, username):
    cursor = db_connection.execute('''SELECT token FROM TOKENS where username = "{username}" 
    order by cast(datetime as unsigned) DESC
    LIMIT 1'''.format(username=username))
    for row in cursor:
        if row:
            return row[0]
    return False


# function to refresh the token for a particular user
def refresh_token(db_connection, username):
    latest_token = get_latest_token(db_connection, username)
    if not latest_token:
        return False
    new_date_time = str(time())
    db_connection.execute('''UPDATE TOKENS 
        set datetime = "{new_date_time}"
        where username = "{username}" AND token = "{token}" 
        '''.format(username=username, token=latest_token, new_date_time=new_date_time))
    db_connection.commit()
    return True
