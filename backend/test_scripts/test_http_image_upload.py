from requests import post

URL = "http://127.0.0.1:5000/uploadBill"

data = {"username": "Abhishek", "description": "Electricity bill"}

file = {'file': open("C:/Users/M H Abhishek/Pictures/flower.jpg", 'rb')}
response_data = post(url=URL, json=data, files=file)
response_data = response_data.json()

print(response_data['uploadStatus'])

