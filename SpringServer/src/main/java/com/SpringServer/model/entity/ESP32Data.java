package com.SpringServer.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "esp32data")
public class ESP32Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
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
