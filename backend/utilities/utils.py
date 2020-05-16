from binascii import hexlify
from hashlib import sha256, pbkdf2_hmac
from os import urandom, getcwd, path
from random import getrandbits
from yaml import load, SafeLoader


def hash_password(password):
    """Hash a password for storing."""
    salt = sha256(urandom(60)).hexdigest().encode('ascii')
    pwdhash = pbkdf2_hmac('sha512', password.encode('utf-8'),
                          salt, 100000)
    pwdhash = hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')


def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = pbkdf2_hmac('sha512',
                          provided_password.encode('utf-8'),
                          salt.encode('ascii'),
                          100000)
    pwdhash = hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password


def token():
    """
    Function to get a token
    :return: Token yield seed
    """
    seed = getrandbits(64)
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
    head, tail = path.split(getcwd())
    current_path = head
    while tail != "costrajectory":
        head, tail = path.split(current_path)
        current_path = head
    current_path = path.join(current_path, "costrajectory")
    return current_path


def get_total_size(premium):
    root_directory = get_root_directory()
    with open(path.join(root_directory, "config.yml"), 'r') as ymlfile:
        cfg = load(ymlfile, SafeLoader)
        if premium:
            total_quota = cfg['server']['limit']['premium']
        else:
            total_quota = cfg['server']['limit']['normal']
        return total_quota
