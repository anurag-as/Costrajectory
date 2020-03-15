# Uploads costracjectory.db to dropbox

import dropbox
import os
from dropbox.files import WriteMode
from utilities.utils import *
import yaml

root_directory = get_root_directory()

with open(os.path.join(root_directory, "config.yml"), 'r') as ymlfile:
    cfg = yaml.load(ymlfile, yaml.SafeLoader)

token = cfg['token']['dropbox']


def upload_db():
    dbx = dropbox.Dropbox(token)
    file_name = os.getcwd().rstrip('utilities') + '/costrajectory.db'
    f = open(file_name, 'rb')
    dbx.files_upload(f.read(), '/costrajectory.db', mode=WriteMode('overwrite'))
    print('Remote database updated successfully.')


def uploadFile(file, file_name):
    dbx = dropbox.Dropbox(token)
    dbx.files_upload(file.read(), "/"+file_name, mode=WriteMode('overwrite'))


if __name__ == "__main__":
    upload_db()
