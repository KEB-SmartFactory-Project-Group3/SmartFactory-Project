package com.start.first;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.IOException;
import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

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
                new MqttPahoMessageDrivenChannelAdapter(mqttBroker, clientId, "arduino/temperature");

        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());

        return adapter;
    }

    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return new MessageHandler() {
            final ObjectMapper objectMapper = new ObjectMapper();

            @Override
            public void handleMessage(Message<?> message) throws MessagingException {
                String payload = (String) message.getPayload();

                try {
                    JsonNode jsonNode = objectMapper.readTree(payload);
                    double temperature = jsonNode.get("temperature").asDouble();
                    int count = jsonNode.get("count").asInt();
                    String machineNumber = jsonNode.get("machineNumber").asText();
                    String timestampString = jsonNode.get("times").asText();
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
                    ZonedDateTime dateTime = ZonedDateTime.parse(timestampString, formatter);
                    Timestamp times = Timestamp.from(dateTime.toInstant());

                    System.out.printf("Received message: {\"machineNumber\":\"%s\",\"temperature\":%.1f,\"count\":%d, \"times\":%s}%n", machineNumber, temperature, count, times);
                } catch (IOException e) {
                    e.printStackTrace(); // handle the exception properly
                }
            }
        };
    }
}
