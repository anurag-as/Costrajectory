from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from time import time
from database_functions.db_connection.connection import connection
from database_functions.utils.bug_fix_flow import new_bugs
from yaml import load, SafeLoader
from os import path
from utilities.utils import get_root_directory
from smtplib import SMTP_SSL
from ssl import create_default_context
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from utilities.api_utils import get_readable_date_time


# function to get the yaml configs
def get_configs():
    root_directory = get_root_directory()

    with open(path.join(root_directory, "config.yml"), 'r') as ymlfile:
        cfg = load(ymlfile, SafeLoader)
    return cfg


bugDetailsAPI = Blueprint('bugDetailsAPI', __name__)


def email_sender(sender_email, receiver_email, password, title, description, bug_id, creation_time):
    """
    Function to send an email
    """

    message = MIMEMultipart("alternative")
    message["Subject"] = "COSTRAJECTORY: New Bug Reported - " + title
    message["From"] = sender_email
    message["To"] = receiver_email

    # Create the plain-text and HTML version of your message
    html = """\
<html>
  <body>
    <h2 style="color:maroon;">Bug Report</h2>
    -------------------------------------------------------------------------------------
    <p color="black">
      <b>Bug Title</b>: {title}<br>
      <b>Bug ID</b>: {bug_id}<br>
      <b>Bug Description</b>: {description}<br>
      <b>Bug Creation Time</b>: {creation_time}<br><br><br>
    -------------------------------------------------------------------------------------
    </p>
    <p>
    <font color="amber"> Contact Us </font> | <a href="mailto:costrajectory@gmail.com"> costrajectory@gmail.com </a>
    </p>
    <p color="black">
    -------------------------------------------------------------------------------------<br>
    </p>
  </body>
</html>
    """.format(title=title, bug_id=bug_id, description=description, creation_time=creation_time)

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(html, "html")

    message.attach(part1)

    # Create secure connection with server and send email
    context = create_default_context()
    with SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )


# function to email bugs to the admins
def email_bug_info(title, description, bug_id, creation_time):
    configs = get_configs()
    admin_emails = configs['admin_details']['admins']
    email = configs['admin_details']['email']
    password = configs['admin_details']['password']
    for admin in admin_emails:
        email_sender(email, admin, password, title, description, bug_id, get_readable_date_time(creation_time))


# API to report bugs for users
@bugDetailsAPI.route('/utils/bugs', methods=['POST'])
@cross_origin()
def bugs():
    """
    API for reporting bugs
    """
    try:
        title = request.json['title']
        description = request.json['description']
        creation_time = str(time())
        bug_id = new_bugs(connection(), title, description, creation_time)
        email_bug_info(title, description, bug_id, creation_time)
        return jsonify({'bug_id': bug_id})
    except:
        return jsonify(False)

