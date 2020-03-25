from io import BytesIO
from random import randint, sample
from PIL import Image
from flask import send_file
from numpy import zeros, uint8
from base64 import b64encode
from flask import jsonify

"""
Colour list
Olive - [40, 250, 106], Light Blue - [66, 140, 252], Dark Blue - [0, 13, 255]
Purple - [140, 0, 255], Baby Pink - [255, 92, 247], Light Red - [255, 92, 92]
Red - [255, 0, 0], Grey - [97, 85, 85], Dark Green - [70, 77, 2]
Green Blue - [0, 255, 179]

"""
colours = [[40, 250, 106], [66, 140, 252], [0, 13, 255], [140, 0, 255], [255, 92, 247], [255, 92, 92],
           [255, 0, 0], [70, 77, 2], [0, 255, 179]]
default_colours = {'peach': [255, 251, 143]}


def number_random(size):
    """
    Generate number of random blocks
    :param size: Side of an image, number of segments
    :return: Number of random coloured blocks
    """
    blocks = size ** 2
    number = randint(0, blocks)
    return number


def particular_blocks(number, size):
    """
    Random blocks which must be coloured
    :param number: Number of random blocks
    :param size: Board size
    :return: Positions of the random blocks
    """
    return sample(range(size ** 2), number)


def one_two(oned, size):
    """
    Converting 1Dimensional number to 2Dimensional number
    :param oned: 1Dimensional Number
    :param size: Size of board
    :return: 2Dimensional number
    """
    x_coordinate = oned // size
    y_coordinate = (oned % size)
    position = (x_coordinate, y_coordinate)
    return position


def block_coordinates(sequence, size):
    """
    Get 2Dimensional Coordinates for all the random sequences
    :param sequence: List of 1D random numbers
    :param size: Board or array dimension
    :return: Tuples of 2D positions
    """
    positions = set()
    for block in sequence:
        positions.add(one_two(block, size))
    return positions


def choose_board_size(input_size):
    """
    Choose a board size based on input size, which evenly divides the input size
    :param input_size: Size of one side
    :return: board size
    """
    standard_size = 512
    return (standard_size // input_size) * input_size


def get_intervals(board_size, input_size):
    """
    Get interval size for colour changing
    :param board_size: Size of board in pixels
    :param input_size: Dimension
    :return: Interval size
    """
    return board_size // input_size


def randomize_colour():
    """
    Randomize the forward colour in the image
    :return: Index of the colour
    """
    return randint(0, len(colours) - 1)


def colour_board(image_data, block_coords, board, interval_size):
    """
    Colour the image based on randomness
    :param image_data: Image matrix
    :param block_coords: Blocks where colour is different from the background
    :param board: Board size
    :param interval_size: Interval for colour changing
    :return: Coloured image
    """
    random_colour = randomize_colour()
    for i in range(board):
        for j in range(board):
            image_data[i][j] = default_colours['peach']
    for block in block_coords:
        for x in range(block[0] * interval_size, (block[0] * interval_size) + interval_size):
            for y in range(block[1] * interval_size, (block[1] * interval_size) + interval_size):
                image_data[x][y] = colours[random_colour]
    return image_data


def initialize_matrix(board_size1):
    """
    Initialize image matrix of pixels
    :param board_size1: Size of board
    :return: data matrix
    """
    data = zeros((board_size1, board_size1, 3), dtype=uint8)
    return data


def form_image(data_actual):
    """
    Form the image from the pixels
    :param data_actual: data pixels
    :return: Image
    """
    image = Image.fromarray(data_actual)
    return image


def show_image(image):
    """
    Function to display the image
    :param image: Image object (PIL)
    :return: None
    """
    image.show()


def save_image(image):
    """
    Save the image in jpg format
    :param image: Image object (PIL)
    :return: None
    """
    image.save(image, "JPEG")


def generate_image():
    resolution = 5
    board_size = choose_board_size(resolution)  # choosing number of pixels on the board
    intervals = get_intervals(board_size, resolution)  # interval for colour changing (pixels)
    data = initialize_matrix(board_size)
    number = number_random(resolution)
    blocks = particular_blocks(number, resolution)
    block_coordinate = block_coordinates(blocks, resolution)
    coloured_data = colour_board(data, block_coordinate, board_size, intervals)
    formed_image = form_image(coloured_data)
    img_io = BytesIO()
    formed_image.save(img_io, 'JPEG', quality=70)
    img_io = img_io.getvalue()
    encoded_string = b64encode(img_io)
    return jsonify({'Image': str(encoded_string.decode('utf-8'))})