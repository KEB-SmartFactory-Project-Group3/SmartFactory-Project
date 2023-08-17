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

app = Flask(__name__)

# React server & CORS
CORS(app, resources={r"*": {"origins": ["http://165.246.116.73:3001", "http://localhost:3000"]}})
# CORS(app, resources={r"*": {"origins": "*"}})

url = 'http://165.246.116.48/'  # Arduino webserver URL

# YOLOv5 모델 불러옴 (로컬에 저장된 best.pt 또는 last.pt 파일 불러옴)
model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/YOLOv5_model/best.pt')
model.conf = 0.60  # 검출 임계값(Threshold) 설정

last_time = 0
print_interval = 5  # 출력 간격
latest_detected_object_names = None  # 직전에 검출된 클래스 이름을 저장하기 위한 변수
latest_detected_time = 0    # 직전에 검출된 시간을 저장하기 위한 변수
first_detection_done = False   # 첫 번째 객체 검출 완료 여부를 나타내는 변수 추가
count = 0
defective_count = 0

# 물건의 일련번호 생성기
serial_counter = 1  # 시리얼 넘버의 시작 숫자를 설정


def generate_serial_number(most_common_name):
    global serial_counter

    # most_common_name에 따라 접두사 선택
    if most_common_name == "Defective":
        prefix = 'AD'
    else:
        prefix = 'AN'

    serial_number = f"{prefix}{serial_counter:04d}"  # 'AD' or 'AN' 접두사와 4자리 숫자를 결합
    serial_counter += 1  # 다음 시리얼 넘버를 사용할 때 카운터를 증가

    return serial_number


@app.route('/get-live-transmission', methods=['GET'])
def get_live_transmission():
    global last_time, latest_detected_object_names, latest_detected_time, first_detection_done, count, defective_count

    img_resp = urllib.request.urlopen(url + 'cam-hi.jpg')
    img_np = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    img = cv2.imdecode(img_np, -1)
    new_width = 640
    new_height = 480
    img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_LINEAR)
    blurred_image = cv2.GaussianBlur(img, (5, 5), 0)
    sharpened_image = cv2.addWeighted(img, 1.5, blurred_image, -0.5, 0)

    # 객체 검출 수행
    results = model(sharpened_image, size=640)

    # 객체 검출 결과를 영상에 표시
    detected_frame = results.render()

    if isinstance(detected_frame, list) and len(detected_frame) > 0:
        detected_frame = detected_frame[0]  # 올바른 이미지를 가져옴

        if isinstance(detected_frame, torch.Tensor):
            detected_frame = detected_frame.numpy().transpose(1, 2, 0)  # PyTorch 텐서를 OpenCV 형식으로 변환

    # 이미지 품질을 50으로 설정하여 압축과 최적화 적용
    is_success, im_buf_arr = cv2.imencode(".jpg", detected_frame, [cv2.IMWRITE_JPEG_QUALITY, 50])
    byte_im = im_buf_arr.tobytes()
    encoded_img = base64.b64encode(byte_im).decode('utf-8')

    # 검출된 객체에 대한 클래스 이름 가져오기
    detected_object_names = [model.names[int(cls)] for cls in results.pred[0][:, -1]]

    current_time = time.time()  # 현재 시각

    if not first_detection_done and detected_object_names:
        first_detection_done = True

    if first_detection_done:  # 첫 번째 객체 검출이 완료된 경우에만 다음 작업을 수행
        # 클래스가 검출되지 않고 직전에 검출된 시간이 5초 이내이면 직전에 검출된 클래스 이름을 사용
        if not detected_object_names and latest_detected_object_names and (current_time - latest_detected_time <= 5):
            detected_object_names = latest_detected_object_names
        else:
            latest_detected_object_names = detected_object_names  # 검출된 클래스 이름을 저장
            latest_detected_time = current_time  # 검출된 시간을 저장

        if current_time - last_time >= print_interval:
            if detected_object_names:  # 이 부분을 추가하여, detected_object_names가 빈 리스트가 아닌 경우에만 작업 수행
                count += 1  # 카운트 증가

                # # 검출된 객체의 클래스 이름을 콘솔에 출력하여 확인
                # print("Detected objects:", detected_object_names)

                # 가장 빈번한 클래스 이름을 선택
                counter = Counter(detected_object_names)
                most_common = counter.most_common(1)

                if most_common:
                    most_common_name = most_common[0][0]
                else:
                    # 빈 리스트의 경우 적절한 처리를 수행
                    most_common_name = None

                serial_number = generate_serial_number(most_common_name)  # 일련번호 생성

                # Defective이면 defective_count를 증가시킴.
                if most_common_name == "Defective":
                    defective_count += 1

                # 클래스 이름을 자바 스프링 백엔드 서버로 전송
                backend_url = 'http://192.168.43.183:8080/api/defective'
                payload = {'state': most_common_name,
                           'count': count,
                           'defectiveCount': defective_count,
                           'serialNumber': serial_number}
                print(payload)
                # response = requests.post(backend_url, json=payload)
                # print(response)
                # # 응답을 콘솔에 출력
                # print("Backend Response:", response.text)
                last_time = current_time

    return jsonify({'image': encoded_img})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
