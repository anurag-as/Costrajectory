from flask import jsonify
from database_functions.db_connection.connection import connection
from database_functions.transactions.image_mapping_flow import get_original_name
from datetime import datetime, timezone
from re import compile, search


# function to build the required json payload for the recent transactions
def build_json_recent_transactions(transactions, user_name):
    response_json = {'username': user_name}  # Building the required response json for the recent transactions
    table_entries = []
    image_intermediate_json = {}
    for each_transaction in transactions:
        intermediate_json = {'Name': each_transaction[0], 'Description': each_transaction[3],
                             'Date': each_transaction[1], 'Amount': each_transaction[2],
                             'uid': each_transaction[5],   'category': each_transaction[6]}
        if each_transaction[4]:
            intermediate_json['HasImage'] = True
            intermediate_json['Identifier'] = each_transaction[4]
            original_name = get_original_name(connection(), user_name, each_transaction[4])
            image_intermediate_json[each_transaction[4]] = original_name

        else:
            intermediate_json['HasImage'] = False
            intermediate_json['Identifier'] = ""
        table_entries.append(intermediate_json)
    response_json['TableEntries'] = table_entries
    response_json['ImageEntries'] = image_intermediate_json
    return jsonify(response_json)


def get_readable_date_time(timestamp):
    utc_time = datetime.fromtimestamp(float(timestamp), timezone.utc)
    local_time = utc_time.astimezone()
    return str(local_time.strftime("%Y-%m-%d %H:%M:%S"))


def get_alias(username):
    if len(username) == 1:
        return username * 2
    regex = compile('[@_!#$%^&*()<>?/|}{~:]')
    if regex.search(username) is None:
        return str(username[:2])
    return str(username[0])*2
