#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "time.h"

const char* ssid = "AndroidHotspot5460";
const char* password = "19990220";
const char* mqtt_server = "192.168.43.9";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const char* ntpServer = "kr.pool.ntp.org";
const long  gmtOffset_sec = 0; 
const int   daylightOffset_sec = 0; 

const byte tempSensor = A2;
const String machineNumber = "Machine C"; // 각 보드의 고유 ID를 설정하세요
int red_button = D6;            
int blue_button = D7;
int trig_pin = D9;      // TRIG pin setting (ultrasonic transmitter pin)
int echo_pin = D8;      // ECHO pin setting (ultrasonic receiver pin)
int count=0;      // Counter variable
int pre_time = 0;   // Previous time when an object passed by

void setupButtons(){  // Set red, blue button pins to INPUT mode
  pinMode(red_button, INPUT);
  pinMode(blue_button, INPUT); 
}

void setupUltrasonics() { // Ultrasonic pin setup
  pinMode(trig_pin, OUTPUT);
  pinMode(echo_pin, INPUT);
}

void setup() {
  Serial.begin(115200);
  setupButtons(); // Call Button setup function
  setupUltrasonics(); // Call ultrasonic pin setup function

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  mqttClient.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  time_t now;
  struct tm timeinfo;
  now = time(nullptr); // 현재 시간을 now 변수에 저장
  gmtime_r(&now, &timeinfo); // 현재 시간을 timeinfo 구조체에 저장

  double temperature = readTemperature();
  updateCountAndDistance(); // Call object recognition count function  

  //String payload = "{\"machineNumber\":" + machineNumber + ", \"temperature\":" + String(temperature) + "}";
  StaticJsonDocument<200> jsonDoc;
  char timeBuffer[30];
  strftime(timeBuffer, sizeof(timeBuffer), "%Y-%m-%dT%H:%M:%S%z", &timeinfo);

  jsonDoc["machineNumber"] = machineNumber;
  jsonDoc["temperature"] = temperature;
  jsonDoc["count"] = count;
  jsonDoc["times"] = String(timeBuffer);
  String payload;
  serializeJson(jsonDoc, payload);
  Serial.println(payload);
  mqttClient.publish("arduino/temperature", payload.c_str());
  
  delay(5000);
}


double readTemperature() { // Temperature measurement function and conversion to Celsius and Fahrenheit
  float R1 = 10000;
  float logR2, R2, T, Tc;
  float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
  int Vo = analogRead(tempSensor); // Read the value from the temperature sensor and convert to temperature
  R2 = R1 * (4095.0 / (float)Vo - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2 * logR2 + c3 * logR2 * logR2 * logR2));
  Tc = round((T - 273.15) * 10) / 10.0; 
  return Tc;
}

void updateCountAndDistance() { // Count objects recognized through the ultrasonic sensor
  long duration, distance;
  digitalWrite(trig_pin, LOW);                
  delayMicroseconds(2);
  digitalWrite(trig_pin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig_pin, LOW);                

  duration = pulseIn (echo_pin, HIGH);        
  distance = ((34 * duration) / 1000) / 2;    

  if (distance > 2 && distance < 5)            
  {
      int now_time = millis();
      if (now_time - pre_time > 500)           
      {
          count += 1;                         
          pre_time = now_time;                
      }
    }
  resetButtonCheck();  // Call reset button function
}


void resetButtonCheck() { // Reset button function (resetting the count variable here)
  if (digitalRead(red_button) == LOW) {
    count = 0;
  }
}


void reconnect() {
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    if (mqttClient.connect("arduinoClient")) {
      Serial.println("MQTT connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
