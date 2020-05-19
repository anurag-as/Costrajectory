# Preparing the user data on spent and paid
def prepare_data(bill_data):
    user = {}
    for each_bill in bill_data:
        try:
            user[each_bill['payer']]['paid'] += int(each_bill['amount'])
        except KeyError:
            user[each_bill['payer']] = {'paid': 0, 'spent': 0}
            user[each_bill['payer']]['paid'] = int(each_bill['amount'])

        for each_user in each_bill['share']:
            try:
                user[each_user[0]]['spent'] += int(each_user[1])
            except KeyError:
                user[each_user[0]] = {'paid': 0, 'spent': 0}
                user[each_user[0]]['spent'] = int(each_user[1])
    return user


# Algorithm to divide the group costs and help in settlement
def cost_sharing_split(bill_data):
    """
    Cost sharing algorithm
    :param bill_data: Bill info
    :return: Cost split between the different users
    """
    user = prepare_data(bill_data)
    print(user)
    return True
