//ESP32Data.java
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp times;
    @Id
    private String machineNumber;
    private double temperature;
    private int count;

    public ESP32Data(Timestamp times, String machineNumber, double temperature, int count) {
        this.times = times;
        this.machineNumber =  machineNumber;
        this.temperature = temperature;
        this.count = count;
    }



}
