# Uploads costracjectory.db to dropbox

import dropbox
import os
from dropbox.files import WriteMode

token = 'UVXGVWSMloAAAAAAAAAAYH3ZFioGbCYRCJGNDTnYGkFy0-qmsh9AwB-BofQ14gW2'


def upload():
    dbx = dropbox.Dropbox(token)
    file_name = os.getcwd().rstrip('utilities') + 'costrajectory.db'
    f = open(file_name, 'rb')
    dbx.files_upload(f.read(), '/costrajectory.db', mode=WriteMode('overwrite'))
    print('Remote database updated successfully.')


if __name__ == "__main__":
    upload()
