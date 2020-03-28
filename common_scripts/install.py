from subprocess import Popen
from os import getcwd, path

# Installing python library requirements
pythonic_library_install = Popen(['pip3', 'install', '-r', 'requirements.txt'], cwd=getcwd())
pythonic_library_install.wait()

# Installing node modules
node_directory = path.join(getcwd().split('common_scripts')[0], 'ui')
node_modules_install = Popen(['npm', 'install'], cwd=node_directory, shell=True)
