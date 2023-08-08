package com.SpringServer.controller;

import com.SpringServer.service.MqttService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MqttController implements MessageHandler {

    @Autowired
    private MqttService mqttService;

    // 처리할 MQTT 메시지를 받아 saveProductFromPayload를 호출
    @ServiceActivator(inputChannel = "mqttInputChannel")
    @Override
    public void handleMessage(Message<?> message) throws MessagingException {
        String payload = (String) message.getPayload();
        mqttService.saveProductFromPayload(payload);
    }

    // 리액트(웹 애플리케이션)로부터 전달된 명령을 처리하고 MQTT 토픽에 해당 명령을 전송
    @MessageMapping("/send-command/{machineNumber}")    // react쪽 stop/start 버튼와 연결된 주소
    public void sendCommandToMqtt(@DestinationVariable String machineNumber, String command) {
        String topic = "esp32/machine/" + machineNumber + "/command";
        mqttService.sendCommand(topic, command);
    }
}