# Downloads costrajectory.db from dropbox and save it in backend as costrajectory_downloaded.db

import dropbox
import os
from dropbox.files import WriteMode

token = 'UVXGVWSMloAAAAAAAAAAYH3ZFioGbCYRCJGNDTnYGkFy0-qmsh9AwB-BofQ14gW2'


def download():
    dbx = dropbox.Dropbox(token)
    dbx.files_download_to_file(os.getcwd() + '\\costrajectory.db',
                               '/costrajectory.db')
    print('DB Successfully updated to remote')


#if __name__ == "__main__":
#    download()
