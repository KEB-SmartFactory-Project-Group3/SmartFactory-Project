#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "AndroidHotspot5460";
const char* password = "19990220";
const char* mqtt_server = "192.168.43.9";
const int mqtt_port = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const byte sensorPin = A1;
const String boardID = "board001"; // 각 보드의 고유 ID를 설정하세요

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  mqttClient.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  
  int sensorValue = analogRead(sensorPin);
  float temperature = convertToTemperature(sensorValue);
  String payload = "{\"boardID\":" + boardID + ", \"photosensor_value\":" + String(temperature) + "}";
  
  mqttClient.publish("arduino/photosensor_value", payload.c_str());
  
  delay(5000);
}

float convertToTemperature(int sensorValue) {
  // 센서에 따른 온도 변환식 사용
  // LM35 센서의 경우 사용할 수 있는 간단한 변환식: (센서 값 * 5.0 / 1023) * 100
  return (sensorValue * 5.0 / 1023) * 100;
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
