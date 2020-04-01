

# function to query recent transactions of a particular user
# limit has also been introduced to enhance the functionality and for future user
def query_recent_transaction(db_connection, username, limit=5):
    cursor = db_connection.execute('''SELECT title, datetime, amount, description, image_name, ID, category
      FROM IMAGES where username = "{username}"
    LIMIT {limit}'''.format(username=username, limit=limit))
    transactions = []  # list of recent transactions
    for row in cursor:
        if row:
            transactions.append(list(row))
    return transactions if transactions else "False"
