# Flask Server
from urllib import request
import cv2
import urllib.request
import numpy as np
import base64
from flask import Flask, jsonify,request
from flask_cors import CORS
import torch


# YOLOv5 모델 불러옴 (로컬에 저장된 best.pt 또는 last.pt 파일 불러옴)
model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/YOLOv5_model/best.pt')
model.conf = 0.60  # 검출 임계값(Threshold) 설정

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": ["http://localhost:3000"]}})

url = 'http://192.168.0.76/'  # Arduino webserver URL


@app.route('/get-live-transmission', methods=['GET'])
def get_live_transmission():
    img_resp = urllib.request.urlopen(url + 'cam-hi.jpg')
    img_np = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    img = cv2.imdecode(img_np, -1)

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
        detected_frame = detected_frame[0]  # 올바른 이미지를 가져옴

        if isinstance(detected_frame, torch.Tensor):
            detected_frame = detected_frame.numpy().transpose(1, 2, 0)  # PyTorch 텐서를 OpenCV 형식으로 변환

    # 이미지 품질을 70으로 설정하여 압축과 최적화 적용
    is_success, im_buf_arr = cv2.imencode(".jpg", detected_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])
    byte_im = im_buf_arr.tobytes()
    encoded_img = base64.b64encode(byte_im).decode('utf-8')

    return jsonify({'image': encoded_img})


@app.route('/capture-image', methods=['POST'])
def capture_image():
    data = request.get_json()
    captured_image = data.get('liveImage', None)

    if captured_image:
        # imageData 접두사 및 데이터 URL 스키마 제거
        base64_image_data = captured_image.split(",")[1]
        decoded_image = base64.b64decode(base64_image_data)

        # bytearray를 numpy 배열로 변환, OpenCV를 사용하여 이미지를 decode
        image_np = np.frombuffer(decoded_image, dtype=np.uint8)
        img_cv2 = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

        # 이미지를 화면에 표시
        cv2.imshow("Captured Image", img_cv2)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

        return jsonify({'message': 'Image displayed'})
    else:
        return jsonify({'error': 'No image received'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

