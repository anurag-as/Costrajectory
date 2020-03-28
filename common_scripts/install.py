from subprocess import Popen
from os import getcwd, path, uname
from yaml import dump
import io


def python_library():
    # Installing python library requirements
    python_library_install = Popen(['pip3', 'install', '-r', 'requirements.txt'], cwd=getcwd())
    python_library_install.wait()


def node_library():
    # Installing node modules
    node_directory = path.join(getcwd().split('common_scripts')[0], 'ui')
    node_modules_install = Popen(['npm', 'install'], cwd=node_directory, shell=True)
    node_modules_install.wait()


def get_params():
    params = list(uname())[:2]
    return params


def config():
    # adding the config.yaml file for the project
    params = get_params()
    system = params[0].lower()
    username = params[1]
    yaml = dict(
        environment=dict(
            host=system,
            user=username
        ),
        token=dict(
            dropbox='Contact project lead'
        ),
        server=dict(
            limit=dict(
                premium=20.0,
                normal=10.0
            )
        )
    )

    yaml_directory = path.join(getcwd().split('common_scripts')[0], 'config.yml')

    with open(yaml_directory, 'w') as outfile:
        dump(yaml, outfile, default_flow_style=False)


if __name__ == '__main__':
    python_library()
    node_library()
    config()
