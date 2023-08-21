# Flask Server
from urllib import request
import cv2
import urllib.request
import numpy as np
import base64
from flask import Flask, jsonify, request
from flask_cors import CORS
import torch
import requests
import time
from collections import Counter
from threading import Thread

app = Flask(__name__)

# React server & CORS
CORS(app, resources={r"*": {"origins": ["http://192.168.43.192:3005"]}})

# Arduino webserver URL
arduino_url = 'http://192.168.43.101/'

# Importing a YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='your_path/yolov5_cupramen_best.pt') # 경로 설정 필요
# Set the detection threshold
model.conf = 0.5

# Variables for counting objects
last_time = 0
print_interval = 3  # output interval
latest_detected_object_names = None  # Variable to store the name of the last detected class
latest_detected_time = 0    # Variable to store the last detected time
first_detection_done = False   # Add a variable to indicate whether the first object detection is complete
count = 0
defective_count = 0
count_from_arduino = 0
timestamp_from_arduino = None
defective_count_from_arduino = 0
pre_count = 0
serial_counter = 1  # Generate a serial number for an item (set the starting number for the serial number)


def fetch_and_process_image():  # Fetching and processing images from the Arduino server
    img_resp = urllib.request.urlopen(arduino_url + 'cam-hi.jpg')
    img_np = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    img = cv2.imdecode(img_np, -1)
    new_width = 640
    new_height = 480
    img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_LINEAR)
    blurred_image = cv2.GaussianBlur(img, (5, 5), 0)
    sharpened_image = cv2.addWeighted(img, 1.5, blurred_image, -0.5, 0)

    return sharpened_image


def process_and_encode_image(results):  # Detect good and bad objects and apply them to an image

    detected_frame = results.render()   # Displaying object detection results on video

    if isinstance(detected_frame, list) and len(detected_frame) > 0:
        detected_frame = detected_frame[0]  # Get the right image

        if isinstance(detected_frame, torch.Tensor):
            detected_frame = detected_frame.numpy().transpose(1, 2, 0)  # Convert PyTorch tensors to OpenCV format

    # Apply compression and optimization by setting the image quality to 50
    is_success, im_buf_arr = cv2.imencode(".jpg", detected_frame, [cv2.IMWRITE_JPEG_QUALITY, 50])
    byte_im = im_buf_arr.tobytes()
    encoded_img = base64.b64encode(byte_im).decode('utf-8')

    return encoded_img


# Generate serial numbers based on whether an object is normal or defective
def generate_serial_number(object_status, count):
    if object_status == "defective":
        prefix = 'AD'
    else:
        prefix = 'AN'

    serial_number = f"{prefix}{count:04d}"  # Combine an 'AD' or 'AN' prefix with a 4-digit number

    return serial_number


# Send data to the Spring backend server
def send_to_backend(serial_number, object_status, defective_count, count, timestamp):
    backend_url = 'http://192.168.43.183:8080/products/save'
    payload = {'serialNumber': serial_number,
               'state': object_status,
               'defectiveCount': defective_count,
               'count': count,
               'productionTime': timestamp}
    print(payload)
    response = requests.post(backend_url, json=payload)
    return response


# Get the object count value and timestamp value from the Arduino ESP32 board
@app.route('/count', methods=['POST'])
def receive_data_from_arduino():
    global count_from_arduino, timestamp_from_arduino, defective_count, defective_count_from_arduino

    json_data = request.get_json()

    count_from_arduino = json_data['count']
    timestamp_from_arduino = json_data['times']

    print("count_from_arduino: ", count_from_arduino)
    print("pre_count:", pre_count, "count_from_arduino:", count_from_arduino)

    return jsonify({"defective_count": defective_count}), 200


# Detect the state of an object by recognizing it
def continuous_object_detection_and_processing():
    global last_time, latest_detected_object_names, latest_detected_time, first_detection_done, count, defective_count
    global count_from_arduino, timestamp_from_arduino, pre_count

    while True:
        if count_from_arduino != pre_count:

            # Import and process images
            sharpened_image = fetch_and_process_image()
            # Perform object detection
            results = model(sharpened_image, size=416)
            # Get class names for detected objects
            detected_object_names = [model.names[int(cls)] for cls in results.pred[0][:, -1]]
            # Save the current time
            current_time = time.time()

            # If the class is not detected, use the last detected class name.
            if not detected_object_names and latest_detected_object_names and (current_time - latest_detected_time <= 5):
                detected_object_names = latest_detected_object_names
            else:
                latest_detected_object_names = detected_object_names    # save the detected class name
                latest_detected_time = current_time     # save the detected time

            # Select the most frequent class name
            counter = Counter(detected_object_names)
            most_common = counter.most_common(1)

            if most_common:
                object_status = most_common[0][0]
            else:
                object_status = "normal"

            if pre_count != 0 and count_from_arduino == 1:
                defective_count = 0

            # increment defective_count if the object is defective
            if object_status == "defective":
                defective_count += 1

            # Generate a serial number
            serial_number = generate_serial_number(object_status, count_from_arduino)

            # Send data to the backend server
            response = send_to_backend(serial_number, object_status, defective_count, count_from_arduino, timestamp_from_arduino)
            print("Backend Response:", response.text)  # 응답을 콘솔에 출력

            pre_count = count_from_arduino
            last_time = current_time

        time.sleep(1)


# Send an image to the React frontend server
@app.route('/get-live-transmission', methods=['GET'])
def get_live_transmission():
    sharpened_image = fetch_and_process_image()
    results = model(sharpened_image, size=416)
    encoded_img = process_and_encode_image(results)

    return jsonify({'image': encoded_img})


if __name__ == '__main__':
    t = Thread(target=continuous_object_detection_and_processing)
    t.start()  # Run the function in a separate thread
    app.run(host='0.0.0.0', debug=False, port=5000, threaded=True)
