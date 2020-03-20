from flask import jsonify
from database_functions import connection, get_original_name


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
