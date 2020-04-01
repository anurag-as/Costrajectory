def get_all_records(db_connection):
    cursor = db_connection.execute("SELECT * FROM TOKENS")
    out = [row[1] for row in cursor]
    db_connection.commit()
    return list(set(out))