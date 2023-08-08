# server.py
import cv2
import urllib.request
import numpy as np
import base64
import io
from flask import Flask, jsonify, send_file
from flask_cors import CORS
import torch

# YOLOv5 모델 불러오기 (로컬에 저장된 best.pt 또는 last.pt 파일)
model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/YOLOv5Model/best.pt')
model.conf = 0.60  # 검출 임계값(Threshold) 설정

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": ["http://localhost:3000"]}})  # 리액트 애플리케이션 도메인이 'http://localhost:3000'

url = 'http://165.246.116.53/'


@app.route('/get-live-transmission', methods=['GET'])
def get_live_transmission():
    img_resp = urllib.request.urlopen(url + 'cam-hi.jpg')
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    img = cv2.imdecode(imgnp, -1)

    new_width = 800
    new_height = 600
    img = cv2.resize(img, (new_width, new_height), interpolation=cv2.INTER_LINEAR)

    blurred_image = cv2.GaussianBlur(img, (5, 5), 0)
    sharpened_image = cv2.addWeighted(img, 1.5, blurred_image, -0.5, 0)

    # 객체 검출 수행
    results = model(sharpened_image, size=640)

    # 객체 검출 결과를 영상에 표시
    detected_frame = results.render()

    if isinstance(detected_frame, list) and len(detected_frame) > 0:
        detected_frame = detected_frame[0]  # 올바른 이미지를 가져옵니다.

        if isinstance(detected_frame, torch.Tensor):
            detected_frame = detected_frame.numpy().transpose(1, 2, 0)  # PyTorch 텐서를 OpenCV 형식으로 변환

    # is_success, im_buf_arr = cv2.imencode(".jpg", img)
    # 이미지 품질을 70으로 설정하여 압축과 최적화 적용
    is_success, im_buf_arr = cv2.imencode(".jpg", detected_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
    byte_im = im_buf_arr.tobytes()
    encoded_img = base64.b64encode(byte_im).decode('utf-8')

    return jsonify({'image': encoded_img})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
