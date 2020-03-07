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


def delete_file(mapped_image_name):
    dbx = dropbox.Dropbox(token)
    dbx.files_delete_v2('/' + mapped_image_name)


