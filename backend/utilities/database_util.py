import sqlite3
import pandas as pd
import os


# utility function to dump database for analysis
def to_csv():
    db = sqlite3.connect('..//costrajectory.db')
    cursor = db.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    for table_name in tables:
        table_name = table_name[0]
        table = pd.read_sql_query("SELECT * from %s" % table_name, db)
        try:
            table.to_csv(".//downloads//" + table_name + '.csv', index_label='index')
        except FileNotFoundError:
            os.mkdir(os.path.join(os.getcwd(), "downloads"))
            table.to_csv("./downloads/" + table_name + '.csv', index_label='index')
    cursor.close()
    db.close()


if __name__ == "__main__":
    to_csv()
