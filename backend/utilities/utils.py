import binascii
import hashlib
import os
import random
import yaml


def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')


def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512',
                                  provided_password.encode('utf-8'),
                                  salt.encode('ascii'),
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password


def token():
    """
    Function to get a token
    :return: Token yield seed
    """
    seed = random.getrandbits(64)
    yield seed


def generate_token():
    """
    Function to generate a unique token
    :return: Token
    """
    return str(list(token())[0])


def get_root_directory():
    """
    Function to get root directory"
    """
    head, tail = os.path.split(os.getcwd())
    current_path = head
    while tail != "costrajectory":
        head, tail = os.path.split(current_path)
        current_path = head
    current_path = os.path.join(current_path, "costrajectory")
    return current_path


def get_total_size():
    root_directory = get_root_directory()
    with open(os.path.join(root_directory, "config.yml"), 'r') as ymlfile:
        cfg = yaml.load(ymlfile, yaml.SafeLoader)
        total_quota = cfg['server']['limit']
        return total_quota
