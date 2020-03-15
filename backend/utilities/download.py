# Downloads costrajectory.db from dropbox and save it in backend as costrajectory_downloaded.db

from dropbox import Dropbox
from os import mkdir, path, getcwd
from yaml import load, SafeLoader
from utilities.utils import get_root_directory

root_directory = get_root_directory()

with open(path.join(root_directory, "config.yml"), 'r') as ymlfile:
    cfg = load(ymlfile, SafeLoader)

token = cfg['token']['dropbox']


def download_db():
    dbx = Dropbox(token)
    if cfg['environment']['host'] == 'linux':
        print("Linux Environment")
        dbx.files_download_to_file(path.join(getcwd().strip('utilities'), 'costrajectory.db'),
                               '/costrajectory.db')
    else:
        print("Windows Environment")
        dbx.files_download_to_file(getcwd() + '\\costrajectory.db',
                                   '/costrajectory.db')
    print('DB Successfully updated to remote')


def download_file(hashed_user_name, mapped_image_name, original_image_name):
    dbx = Dropbox(token)
    download_path = path.join(getcwd().strip('utilities'), "temp", hashed_user_name)
    if not path.exists(download_path):
        mkdir(download_path)
    dbx.files_download_to_file(path.join(download_path, mapped_image_name),
                               '/' + mapped_image_name)


if __name__ == "__main__":
    download_db()
