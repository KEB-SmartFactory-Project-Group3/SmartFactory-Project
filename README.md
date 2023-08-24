# 🖥️ 스마트팩토리 모니터링 및 원격 제어 시스템 프로젝트
스마트팩토리 공정 실시간 모니터링 플랫폼 구축
        
---
## ✏️ 프로젝트 개요
본 프로젝트는 공장의 모니터링 및 원격 제어 시스템을 개발하는 것을 목표로 한다. 아두이노를 활용하여 센서 데이터를 수집하고, 웹 애플리케이션을 사용하여 실시간 모니터링 및 제어 기능을 구현한다.


---

![](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Readme/new%20system%20flow.PNG)

---
## 🕑 개발 기간
- 23.07.24 - 23.08.23

---
## 👥 멤버 구성       
 - 팀장  : 오현진 - 불량품 검출 AI(Colab), Flask, ESP32 CAM, Arduino ESP32(ET Board), 발표
 - 팀원1 : 김도환 - Spring Boot, DB, Arduino ESP32(ET Board)
 - 팀원2 : 이다빈 - React, PPT제작

---
## 💻 개발 환경

### 🌐 Front-End

- ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)

- ![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)

- ![CSS3](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)

- ![Material-UI](https://img.shields.io/badge/MUI-5.14.3-0081CB?logo=material-ui)

### 🖥️ Back-End

- ![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=java&logoColor=white)
  
- ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
  
- ![Flask](https://img.shields.io/badge/Flask-black?logo=flask&logoColor=white)

### 📦 Framework

- ![Node.js](https://img.shields.io/badge/Node.js-14.21.3-339933?logo=node.js&logoColor=white)

- ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.1.2-6DB33F?logo=spring-boot)

### 🗃️ Database

- ![MySQL](https://img.shields.io/badge/MySQL-blue?logo=mysql&logoColor=white)

### 🔌 Sensor

- ![Arduino](https://img.shields.io/badge/Arduino-00979D?logo=arduino&logoColor=white)
  
- ![C++](https://img.shields.io/badge/C%2B%2B-00599C?logo=c%2B%2B&logoColor=white)

- ![ESP32](https://img.shields.io/badge/ESP32-blue?logo=espressif&logoColor=white)


---

## ⚙️ 기능 소개

- 센서 데이터 수집 및 저장
- 실시간 그래프를 통한 온도, 조도, 생산량 등의 시각화
- 웹 애플리케이션을 통한 공장 제어
 
  - ### 🔒 로그인 [로그인 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(로그인))
    - 서버와의 통신
    - 인증 상태 확인
    - 로그아웃 (사용자 정보 초기화)
    - 로그인 성공 시 인증 토큰 반환 (쿠키에 저장)
  - ### 🏠 홈 대시보드 [홈 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(홈-대시보드))
    - 사용자 정의 훅을 사용하여 데이터 가져옴
    - 생산관리, 온습도, 불량품 대시보드
  - ### 📈 생산 관리 페이지 [생산 관리 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(생산-관리))
    - 데이터 전송 및 알림
    - 타이머 및 카운터 기능
    - 알림 및 경고
    - 목표 생산량 입력 및 처리
  - ### 🌡️ 온습도 페이지 [온습도 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(온습도))
    - 온도 적정 범위
    - 실시간 온습도 그래프
    - 실시간 최대 최소 평균값
  - ### ❌ 제품 정보 페이지 [제품 정보 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(불량품-검출))
  - ### ⚠️ 에러 페이지 [에러 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(Error))
    - 오류 메시지 표시
  - ### 🗃️ 생산 관리 DB [생산 DB 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/기능(생산관리-DB))
    - 생산 관리 관련 데이터 베이스 저장
- 컴퓨터 비전과 인공지능을 활용한 식품 물체 인식
  - ### 🖥️ 컴퓨터 비전 페이지 [컴퓨터 비전 상세 wiki](https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/wiki/컴퓨터-비전)

---

## 🏆 프로젝트 결과

<div align="center">

### 로그인 화면

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/로그인페이지.gif" alt="로그인 화면" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>

<div align="center">

### main 화면

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/메인.gif" alt="main 화면" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>

<div align="center">

### 생산관리 - 목표생산량 전송 및 가동시작 

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/생산관리1-가동시작.gif" alt="목표생산량 전송 및 가동시작" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>


<div align="center">

### 생산관리 - 가동중지 및 제품관리DB

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/생산관리2-가동중지_제품관리DB.gif" alt="가동중지 및 제품관리DB" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>

<div align="center">

### 생산관리 - 불량품 및 도달률

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/생산관리2-불량품검출_도달률100_.gif" alt="불량품 및 도달률" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>


<div align="center">

### 온습도 화면

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/리셋.gif" alt="온습도 화면" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>

<div align="center">

### 리셋 

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/리셋.gif" alt="reset 화면" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>

<div align="center">

### 로그아웃

<img src="https://github.com/KEB-SmartFactory-Project-Group3/SmartFactory-Project/blob/image/Image/Project%20Result/리셋.gif" alt="로그아웃" width="70%" style="border-radius: 10px; box-shadow: 0px 0px 15px rgba(0,0,0,0.2);">

</div>
---

---

