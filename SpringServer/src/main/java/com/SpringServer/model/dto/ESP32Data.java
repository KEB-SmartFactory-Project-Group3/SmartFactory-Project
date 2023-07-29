package com.SpringServer.model.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
public class ESP32Data {
    @Id
    @GeneratedValue
    private Long id;
    @JsonDeserialize(using = TimestampDeserializer.class)
    private Timestamp times;
    private double temperature;
    private int brightness;
    private int count;

    public ESP32Data(Long id, Timestamp times, double temperature, int brightness, int count) {
        this.id = id;
        this.times = times;
        this.temperature = temperature;
        this.brightness = brightness;
        this.count = count;
    }



}
