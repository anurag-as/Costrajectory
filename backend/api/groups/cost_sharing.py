from sys import maxsize
from copy import deepcopy


# Preparing the user data on spent and paid and net
def prepare_data(bill_data, settlement_data):
    """
    Computing the spent and paid amount for each users for each group
    :param bill_data: Bill information for a particular group
    :param settlement_data: History of settlements info
    :return: Paid and Spent and net for each user individually.
    """
    user = {}

    # for bills
    for each_bill in bill_data:
        print("Each bill", each_bill)
        print(each_bill['amount'])
        try:
            print("1")
            user[each_bill['payer']]['paid'] += float(each_bill['amount'])
            print("2")
            user[each_bill['payer']]['net'] -= float(each_bill['amount'])
            print("3")

        except KeyError:
            print("4")
            user[each_bill['payer']] = {'paid': 0, 'spent': 0, 'net': 0}
            print("5")
            user[each_bill['payer']]['paid'] = float(each_bill['amount'])
            print("6")
            user[each_bill['payer']]['net'] = -1 * float(each_bill['amount'])
            print("7")
        print("Each bill", each_bill)
        for each_user in each_bill['share']:
            try:
                print("8")
                print("User", user)
                user[each_user[0]]['spent'] += float(each_user[1])
                print("9")
                user[each_user[0]]['net'] += float(each_user[1])
                print("10")
            except Exception as e:
                print("11", e)
                user[each_user[0]] = {'paid': 0, 'spent': 0, 'net': 0}
                user[each_user[0]]['spent'] = float(each_user[1])
                user[each_user[0]]['net'] = float(each_user[1])
        print("User", user)
    print("User222", user)
    print("Settlement data", settlement_data)
    # for settlements
    for each_bill in settlement_data:
        try:
            user[each_bill['payer']]['paid'] += float(each_bill['amount'])
            user[each_bill['payer']]['net'] -= float(each_bill['amount'])

        except KeyError:
            user[each_bill['payer']] = {'paid': 0, 'spent': 0, 'net': 0}
            user[each_bill['payer']]['paid'] = float(each_bill['amount'])
            user[each_bill['payer']]['net'] = -1 * float(each_bill['amount'])

        for each_user in each_bill['share']:
            try:
                user[each_user[0]]['spent'] += float(each_user[1])
                user[each_user[0]]['net'] += float(each_user[1])

            except KeyError:
                user[each_user[0]] = {'paid': 0, 'spent': 0, 'net': 0}
                user[each_user[0]]['spent'] = float(each_user[1])
                user[each_user[0]]['net'] = float(each_user[1])
        print("User1", user)
    return user


# check if sharing is done
def net_zero(users):
    for each_user in users.keys():
        print(users[each_user])
        if float(users[each_user]['net']) >= 1:
            return False
    return True


# get max paid and max spent user currently
def get_max_min(users):
    """
    Max net and min net among all the users
    :param users: Bill data
    :return: Max and min (usernames and amount)
    """
    max_user = ""
    max_amount = -1 * maxsize
    min_user = ""
    min_amount = maxsize
    for user, details in users.items():
        if details['net'] > max_amount:
            max_user = user
            max_amount = details['net']
        if details['net'] < min_amount:
            min_user = user
            min_amount = details['net']
    return max_user, max_amount, min_user, min_amount


# optimizing cost sharing between users to minimize transactions
def optimize_share(user):
    """
    Optimizing and returning the required settlements in a given format
    :param user: paid, spent and net for each user
    :return: Returning the settlements needed to be made for each group
    """
    settlements = []
    #keep a count to prevent Hang
    count = 0

    while not net_zero(user):
        print("Count", count)
        max_user, max_val, min_user, min_val = get_max_min(user)
        settlement_amount = abs(min(abs(max_val), abs(min_val)))
        user[max_user]['net'] -= settlement_amount
        user[min_user]['net'] += settlement_amount
        settlements.append([max_user, min_user, settlement_amount])
        count += 1
        if(count >= 100):
            settlements = []
            break
    return settlements


# Algorithm to divide the group costs and help in settlement
def cost_sharing_split(bill_data, settlement_data):
    """
    Cost sharing algorithm
    :param bill_data: Bill info
    :param settlement_data: History of settlements info
    :return: Cost split between the different users
    """
    user = prepare_data(bill_data, settlement_data)
    print("user", user)
    user_data = deepcopy(user)
    sharing_payload = {'raw_data': user_data}
    print("sharing_payload", sharing_payload)
    optimized_sharing = optimize_share(user)
    print("Optimized sharing", optimized_sharing)
    sharing_payload['settlements'] = optimized_sharing
    return sharing_payload
