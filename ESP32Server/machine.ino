#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <HTTPClient.h>
#include "oled_u8g2.h" // oled display
#include <ArduinoJson.h>  // json Form
#include <time.h> // 응답 보내는 시간 위함
#include "DHT.h"

#define DHTPIN A7
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE); // 사용핀넘버 타입 등록


//------------------------ global variables ------------------------------------------------------------------
// const char* ssid = "Dohwan"; // "KT_GiGA_F2EA"; // "SmartFactory"; //                   // 와이파이 아이디
// const char* password = "dh990921"; // "ffk8ebb167"; // "inha4885"; //     // 와이파이 비밀번호
const char* ssid = "AndroidHotspot5460"; 
const char* password = "19990220"; 

WebServer server(80);
OLED_U8G2 oled; // create oled object

// sensor
int temp_sensor = A2;    // temperature sensor
int photoresistor_sensor = A1;    // photoresistor_sensor
int echo_pin  = D8;               // 초음파 센서 수신부
int trig_pin  = D9; 

// led
int red_led    = D2;                     
int blue_led   = D3;                       
int green_led  = D4;                      
int yellow_led = D5;

// switch
int reset_pin = D6;


// counting_var : to store the previous value
int count = 0;        // 카운터용 변수
int pre_time = 0;     // 이전에 물건이 지나간 시간
bool isSending = false;


// Machine state
boolean state = false;  // 시작시 바로 COUNTING 안함



//--------------------------- setup --------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);  // ESP32 baud rate
  oled.setup();

  // wifi connecting setting
  WiFi.mode(WIFI_STA);        // Set to Connection Mode
  WiFi.begin(ssid, password);      // Attempt to connect to WiFi
  Serial.println("");

  while (WiFi.status() != WL_CONNECTED) {       // Keep waiting until the connection
    delay(500);
    Serial.print(".");
  }

  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // NTP 서버에서 시간 동기화
  configTime(9 * 3600, 0, "pool.ntp.org"); // NTP 서버에서 시간 동기화

  // pinMode setting
  pinMode(red_led, OUTPUT);                  
  pinMode(blue_led, OUTPUT);                 
  pinMode(green_led, OUTPUT);               
  pinMode(yellow_led, OUTPUT);
  pinMode(trig_pin, OUTPUT);
  pinMode(echo_pin, INPUT);          

  server.on("/machineOff", machineOff);
  server.on("/machineOn", machineOn);
  server.on("/machineReset", machineReset);

  server.begin();   
  dht.begin(); // DHT 초기화
  Serial.println("Machine connected");
  digitalWrite(red_led, HIGH);  // 초기 LED
}


//---------------------------- loop --------------------------------------------------------------------------
void loop() {
  server.handleClient();
  if (state == true) {
    counting();
  }
  oled_display();
}


//--------------------------- functions ----------------------------------------------------------------------
void machineOff(){
  Serial.println("machineOff");
  digitalWrite(red_led, HIGH);
  digitalWrite(green_led, LOW);
  state = false;
  StaticJsonDocument<128> jsonDocument;
  jsonDocument["message"] = "Machine Stop";
  String jsonResponse;
  serializeJson(jsonDocument, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

void machineOn(){
  Serial.println("machineOn");
  digitalWrite(red_led, LOW);
  digitalWrite(green_led, HIGH);
  state = true;
  StaticJsonDocument<128> jsonDocument;
  jsonDocument["message"] = "Machine Start";
  String jsonResponse;
  serializeJson(jsonDocument, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

void machineReset(){
  Serial.println("machineReset");
  count = 0;
  state = false;
  StaticJsonDocument<128> jsonDocument;
  jsonDocument["message"] = "Machine Reset";
  String jsonResponse;
  serializeJson(jsonDocument, jsonResponse);
  server.send(200, "application/json", jsonResponse);
}

void sendDataToServer(int currentCount) {
  HTTPClient http;
  // String serverUrl = "http://172.20.10.3:8080/machine/data";
  String serverUrl = "http://192.168.43.183:8080/machine/data";
  String requestBody;

  time_t now;
  struct tm timeinfo;

  time(&now);                   // 현재 시간을 가져오기
  localtime_r(&now, &timeinfo); // 현재 시간을 구조화된 형태로 변환

  // JSON 응답에 시간 추가
  char timeBuffer[32];
  strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%d %H:%M:%S", &timeinfo);
  StaticJsonDocument<200> jsonDocument;
  jsonDocument["count"] = currentCount;
  jsonDocument["times"] = timeBuffer;

  serializeJson(jsonDocument, requestBody);

  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(requestBody);
  
  http.end();
  isSending = false; // 전송 완료 상태로 설정
}



void counting(){
  long duration, distance;
  digitalWrite(trig_pin, LOW);                // 초음파 센서 거리 센싱 시작
  delayMicroseconds(2);
  digitalWrite(trig_pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_pin, LOW);  

  duration = pulseIn (echo_pin, HIGH);        // 반사되어 돌아온 초음파의 시간을 저장
  distance = ((34 * duration) / 1000) / 2;    // 측정된 값을 cm로 변환하는 공식

  if(distance > 2 && distance < 5){            // 물체와의 거리가 2cm 초과 10cm 미만이면
    int now_time = millis();
    if(now_time - pre_time > 500 && !isSending){           // 중복 카운트를 방지하기 위해 0.5초 초과면 
      count += 1;                         // 한번 카운트
      isSending = true; // 전송 시작 상태로 설정
      sendDataToServer(count);                // 서버로 데이터 전송
      pre_time = now_time;                // 이전 시각에 현재 시각 저장
    }
  }

  if(digitalRead(reset_pin) == LOW){           // 리셋 버튼을 누르면
    Serial.println("count reset");                
    count = 0;                              // 카운트 초기화
  } 
}

void oled_display(){
  char text1[32] = "count: ";                // text1 count 값 표시
  char value1[32];
  String str1 = String(count, DEC);
  str1.toCharArray(value1, 6);
  strcat(text1, value1);

  oled.setLine(1, "SmartFactory");
  oled.setLine(2, text1);
    if(state == true){
    oled.setLine(3, "Start");
  }else{
    oled.setLine(3, "Stop");
  }
  oled.display();
}