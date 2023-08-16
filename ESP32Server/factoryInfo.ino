#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include "oled_u8g2.h" // oled display
#include <ArduinoJson.h>  // json Form
#include <time.h> // 응답 보내는 시간 위함
#include "DHT.h"

#define DHTPIN A7
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE); // 사용핀넘버 타입 등록


//------------------------ global variables ------------------------------------------------------------------
const char* ssid = "AndroidHotspot5460"; // "KT_GiGA_F2EA"; // "SmartFactory"; //                   // 와이파이 아이디 
const char* password =   "19990220"; // "ffk8ebb167"; // "inha4885"; //     // 와이파이 비밀번호

unsigned long lastSendTime = 0;

OLED_U8G2 oled; // create oled object

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
  
  dht.begin(); // DHT 초기화
  Serial.println("Web server started!");
}


//---------------------------- loop --------------------------------------------------------------------------
void loop() {
  oled_display();

  unsigned long currentTime = millis();
  if (currentTime - lastSendTime >= 1000) {
    sendDataToServer();
    lastSendTime = currentTime;
  }

  delay(500); // 500/1000 sec
}


//--------------------------- functions ----------------------------------------------------------------------

void sendDataToServer() {
  if (WiFi.status() != WL_CONNECTED) {
    return;
  }

  HTTPClient http;
  String serverUrl = "http://192.168.43.183:8080/factoryinfo/data";
  String requestBody;

  time_t now;
  struct tm timeinfo;

  time(&now);                   // 현재 시간을 가져오기
  localtime_r(&now, &timeinfo); // 현재 시간을 구조화된 형태로 변환

  // JSON 응답에 시간 추가
  char timeBuffer[32];
  strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%d %H:%M:%S", &timeinfo);
  StaticJsonDocument<200> jsonDocument;
  jsonDocument["times"] = timeBuffer;
  jsonDocument["factoryTemperature"] = round(dht.readTemperature() * 10.0) / 10.0;
  jsonDocument["factoryHumidity"] = dht.readHumidity();

  serializeJson(jsonDocument, requestBody);

  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(requestBody);

  if (httpResponseCode == 200) {
    Serial.println("데이터 전송 성공!");
  } else {
    Serial.print("데이터 전송 실패. HTTP 응답 코드: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
}


void oled_display(){
  char value1[32];
  char value2[32];
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  sprintf(value1, "%.1f %%", humidity);
  sprintf(value2, "%.1f C", temperature); // 소수점 아래 1자리까지 표시한 후 C 를 추가
  oled.setLine(1, value1);
  oled.setLine(2, value2);
  oled.display();
}