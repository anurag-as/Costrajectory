# Preparing the user data on spent and paid and net
def prepare_data(bill_data):
    """
    Computing the spent and paid amount for each users for each group
    :param bill_data: Bill information for a particular group
    :return: Paid and Spent and net for each user individually.
    """
    user = {}
    for each_bill in bill_data:
        try:
            user[each_bill['payer']]['paid'] += int(each_bill['amount'])
            user[each_bill['payer']]['net'] -= int(each_bill['amount'])

        except KeyError:
            user[each_bill['payer']] = {'paid': 0, 'spent': 0, 'net': 0}
            user[each_bill['payer']]['paid'] = int(each_bill['amount'])
            user[each_bill['payer']]['net'] = -1 * int(each_bill['amount'])

        for each_user in each_bill['share']:
            try:
                user[each_user[0]]['spent'] += int(each_user[1])
                user[each_user[0]]['net'] += int(each_user[1])

            except KeyError:
                user[each_user[0]] = {'paid': 0, 'spent': 0, 'net': 0}
                user[each_user[0]]['spent'] = int(each_user[1])
                user[each_user[0]]['net'] = int(each_user[1])

    return user


# optimizing cost sharing between users to minimize transactions
def optimize_share(user):
    """
    Optimizing and returning the required settlements in a given format
    :param user: paid, spent and net for each user
    :return: Returning the settlements needed to be made for each group
    """
    return user


# Algorithm to divide the group costs and help in settlement
def cost_sharing_split(bill_data):
    """
    Cost sharing algorithm
    :param bill_data: Bill info
    :return: Cost split between the different users
    """
    user = prepare_data(bill_data)
    optimized_sharing = optimize_share(user)
    return optimized_sharing
