# function to add profile details table
def create_profile_details_table(db_connection):
    db_connection.execute('''CREATE TABLE PROFILEDETAILS
         (ID INTEGER PRIMARY KEY  AUTOINCREMENT NOT NULL ,
          username           TEXT    NOT NULL,
          first_name         TEXT    ,
          last_name          TEXT    ,
          email              TEXT    ,
          address            TEXT    ,
          address2           TEXT    ,
          dob                TEXT    ,
          gender             TEXT    ,
          country            TEXT    ,
          state              TEXT    ,
          zip_code           TEXT    
          );''')
    db_connection.commit()


# function to edit the profile details
def edit_profile_table(db_connection, username, first_name, last_name, email, address, address2,
                       dob, gender, country, state, zip_code):
    db_connection.execute('''UPDATE PROFILEDETAILS SET  
                                                first_name="{first_name}",
                                                last_name="{last_name}",
                                                email="{email}",
                                                address="{address}",
                                                address2="{address2}",
                                                dob="{dob}",
                                                gender="{gender}",
                                                country="{country}",
                                                state="{state}",
                                                zip_code="{zip_code}"
                            WHERE username="{username}"'''
                          .format(username=username, first_name=first_name, last_name=last_name, email=email,
                                  address=address, address2=address2, dob=dob,
                                  gender=gender, country=country, state=state,
                                  zip_code=zip_code
                                  ))
    db_connection.commit()
    return "Profile details updated successfully"


# function to add profile details
def insert_into_profile_details(db_connection, username, first_name, last_name, email, address, address2,
                                dob, gender, country, state, zip_code):
    db_connection.execute('''INSERT INTO PROFILEDETAILS (username, first_name, last_name, email, address, address2,
                                dob, gender, country, state, zip_code) 
        VALUES ("{username}", "{first_name}", "{last_name}", "{email}", "{address}", "{address2}",
                                "{dob}", "{gender}", "{country}", "{state}", "{zip_code}")'''
                          .format(username=username, first_name=first_name, last_name=last_name, email=email,
                                  address=address, address2=address2, dob=dob,
                                  gender=gender, country=country, state=state,
                                  zip_code=zip_code
                                  ))
    db_connection.commit()
    return "Profile details updated successfully"


# function to query profile details of a particular user
def query_profile_details(db_connection, username):
    cursor = db_connection.execute('''SELECT username, first_name, last_name, email, address, address2,
                                dob, gender, country, state, zip_code
      FROM PROFILEDETAILS where username = "{username}"
    LIMIT 1'''.format(username=username))
    for row in cursor:
        return list(row)
    return False


# function to get the full name for a particular username
def get_name(db_connection, username):
    cursor = db_connection.execute('''SELECT  first_name, last_name
            FROM PROFILEDETAILS where username = "{username}"
    LIMIT 1'''.format(username=username))
    for row in cursor:
        return list(row)
    return False
