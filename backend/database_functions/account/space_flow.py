# function to calculate total space consumed by user in server
def space_usage(db_connection, username):
    cursor = db_connection.execute('''SELECT image_name
          FROM IMAGES where username = "{username}"
    '''.format(username=username))
    sizes = []  # list of image sizes
    for row in cursor:
        if row[0] != "False":
            cursor1 = db_connection.execute('''SELECT file_size
                      FROM IMAGE_SIZE where mapped_name = "{image_name}"
                '''.format(image_name=row[0]))
            for row1 in cursor1:
                sizes.append(float(row1[0]))
    return sum(sizes) if sizes else 0


# function to calculate total space consumed by user for group bills
def group_space_usage(db_connection, username):
    cursor = db_connection.execute('''SELECT image_name
          FROM GROUP_BILLS where uploader = "{username}"
    '''.format(username=username))
    sizes = []  # list of image sizes
    for row in cursor:
        if row[0] != "False":
            cursor1 = db_connection.execute('''SELECT file_size
                      FROM IMAGE_SIZE where mapped_name = "{image_name}"
                '''.format(image_name=row[0]))
            for row1 in cursor1:
                sizes.append(float(row1[0]))
    return sum(sizes) if sizes else 0
