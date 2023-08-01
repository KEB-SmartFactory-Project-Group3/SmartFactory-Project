package com.start.first;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.messaging.MessagingException;

@SpringBootApplication
public class MqttSpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(MqttSpringBootApplication.class, args);
        System.out.println("MQTT Configuration Initialized.");

        MqttService mqttService = new MqttService();
        mqttService.connectAndPublish("ON");
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound() {
        String clientId = MqttClient.generateClientId();
        String mqttBroker = "tcp://192.168.43.9:1883";

        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter(mqttBroker, clientId, "arduino/photosensor_value");

        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());

        return adapter;
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return new MessageHandler() {
            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                String payload = (String) message.getPayload();
                System.out.println("Received message: " + payload);
                // JSON 파싱 및 필요한 작업 수행
            }
        };
    }
}