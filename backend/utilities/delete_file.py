# Downloads costrajectory.db from dropbox and save it in backend as costrajectory_downloaded.db

from dropbox import Dropbox
import os
from yaml import load, SafeLoader
from utilities.utils import get_root_directory

root_directory = get_root_directory()

with open(os.path.join(root_directory, "config.yml"), 'r') as ymlfile:
    cfg = load(ymlfile, SafeLoader)

token = cfg['token']['dropbox']


def delete_file(mapped_image_name):
    dbx = Dropbox(token)
    dbx.files_delete_v2('/' + mapped_image_name)
