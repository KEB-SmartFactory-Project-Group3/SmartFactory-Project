package com.SpringServer.service;

import com.SpringServer.model.entity.Products;
import com.SpringServer.repository.ProductsRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import org.eclipse.paho.client.mqttv3.*;

@Service
public class MqttService{

    @Autowired
    private IMqttClient mqttClient;

    @Autowired
    private ProductsRepository productsRepository;

    // ObjectMapper 객체를 사용하여 JSON 문자열을 Java 객체로 변환
    private final ObjectMapper objectMapper = new ObjectMapper();

    // payload로 전달받은 온도 정보를 Products 객체로 변환하여 저장
    public void saveProductFromPayload(String payload) {
        try {
            Products product = objectMapper.readValue(payload, Products.class);
            System.out.println("machineNumber: " + product.getMachineNumber()
                    + "temperature: " + product.getTemperature()
                    + "count: " + product.getCount()
                    + "times: " + product.getTimes());

            productsRepository.save(product);

        } catch (IOException e) {
            throw new IllegalArgumentException("Failed to parse product payload", e);
        }
    }

    // 주어진 MQTT 토픽에 명령을 전달
    public void sendCommand(String topic, String command) {
        try {
            MqttMessage message = new MqttMessage();
            message.setPayload(command.getBytes());
            mqttClient.publish(topic, message);
        } catch (MqttException e) {
            throw new RuntimeException("Failed to send MQTT command", e);
        }
    }
}