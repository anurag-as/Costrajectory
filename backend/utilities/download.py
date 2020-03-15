# Downloads costrajectory.db from dropbox and save it in backend as costrajectory_downloaded.db

import dropbox
import os
import yaml
from dropbox.files import WriteMode
from utilities.utils import *

root_directory = get_root_directory()

with open(os.path.join(root_directory, "config.yml"), 'r') as ymlfile:
    cfg = yaml.load(ymlfile, yaml.SafeLoader)

token = cfg['token']['dropbox']


def download_db():
    dbx = dropbox.Dropbox(token)
    if cfg['environment']['host'] == 'linux':
        print("Linux Environment")
        dbx.files_download_to_file(os.path.join(os.getcwd().strip('utilities'), 'costrajectory.db'),
                               '/costrajectory.db')
    else:
        print("Windows Environment")
        dbx.files_download_to_file(os.getcwd() + '\\costrajectory.db',
                                   '/costrajectory.db')
    print('DB Successfully updated to remote')


def download_file(hashed_user_name, mapped_image_name, original_image_name):
    dbx = dropbox.Dropbox(token)
    download_path = os.path.join(os.getcwd().strip('utilities'), "temp", hashed_user_name)
    if not os.path.exists(download_path):
        os.mkdir(download_path)
    dbx.files_download_to_file(os.path.join(download_path, mapped_image_name),
                               '/' + mapped_image_name)


if __name__ == "__main__":
    download_db()
