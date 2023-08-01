package com.start.second;

import org.eclipse.paho.client.mqttv3.*;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class MqttServiceLED {
    public static void main(String[] args) {
//        SpringApplication.run(MqttServiceLED.class, args);
        System.out.println("MQTT Configuration Initialized.");

        MqttServiceLED mqttServiceLED = new MqttServiceLED();
        mqttServiceLED.connectAndPublish("ON");
    }
    public void connectAndPublish(String payload) {
        String mqttBroker = "tcp://192.168.43.9:1883";
        String clientId = MqttClient.generateClientId();
        MemoryPersistence persistence = new MemoryPersistence();
        MqttClient mqttClient;

        try {
            mqttClient = new MqttClient(mqttBroker, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);

            mqttClient.setCallback(
                    new MqttCallback() {
                        public void connectionLost(Throwable cause) {
                            System.out.println("Connection lost. Reason: " + cause);
                        }

                        public void messageArrived(String topic, MqttMessage message) throws Exception {
                            System.out.println("Message arrived. Topic: " + topic + " Message: " + message.toString());
                        }

                        public void deliveryComplete(IMqttDeliveryToken token) {
                            System.out.println("Delivery complete. " + token);
                        }
                    });

            System.out.println("Connecting to broker: " + mqttBroker);
            IMqttToken token = mqttClient.connectWithResult(connOpts);
            System.out.println("Connected: " + token.getResponse().getKey());

            System.out.println("Publishing message: " + payload);
            MqttMessage mqttMessage = new MqttMessage(payload.getBytes());
            mqttMessage.setQos(0);
            mqttClient.publish("arduino/led", mqttMessage);

            System.out.println("Message published");

            mqttClient.disconnect();
            System.out.println("Disconnected");
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
