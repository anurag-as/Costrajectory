# Downloads costrajectory.db from dropbox and save it in backend as costrajectory_downloaded.db

import dropbox
import os
import yaml
from dropbox.files import WriteMode

with open("..//..//config.yml", 'r') as ymlfile:
    cfg = yaml.load(ymlfile)

token = cfg['token']['dropbox']


def download():
    dbx = dropbox.Dropbox(token)
    if cfg['environment']['host'] == 'linux':
        print("Linux Environment")
        dbx.files_download_to_file(os.getcwd().rstrip("utilities") + 'costrajectory.db',
                               '/costrajectory.db')
    else:
        print("Windows Environment")
        dbx.files_download_to_file(os.getcwd() + '\\costrajectory.db',
                                   '/costrajectory.db')
    print('DB Successfully updated to remote')


if __name__ == "__main__":
    download()
