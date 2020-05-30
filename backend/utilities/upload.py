# Uploads costrajectory.db to dropbox

from dropbox.files import WriteMode
from dropbox import Dropbox
from os import path, getcwd
from yaml import load, SafeLoader
from utilities.utils import get_root_directory

root_directory = get_root_directory()

with open(path.join(root_directory, "config.yml"), 'r') as ymlfile:
    cfg = load(ymlfile, SafeLoader)

token = cfg['token']['dropbox']


def upload_db():
    dbx = Dropbox(token)
    file_name = getcwd().rstrip('utilities') + '/costrajectory.db'
    f = open(file_name, 'rb')
    dbx.files_upload(f.read(), '/costrajectory.db', mode=WriteMode('overwrite'))
    print('Remote database updated successfully.')


def uploadFile(file, file_name):
    dbx = Dropbox(token)
    dbx.files_upload(file.read(), "/"+file_name, mode=WriteMode('overwrite'))


if __name__ == "__main__":
    upload_db()
