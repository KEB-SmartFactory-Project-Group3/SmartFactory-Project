package com.start.first.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import java.time.LocalDateTime;

@Entity
@IdClass(ProductsId.class)
public class Products {
    @Id
    @Column(name = "timestamp", nullable = false, insertable = true, updatable = true)
    private LocalDateTime timestamp;

    @Id
    @Column(name = "machine_number", nullable = false, insertable = true, updatable = true)
    private String machineNumber;
    @Column(name = "temperature", nullable = false, insertable = true, updatable = true, columnDefinition = "DECIMAL(10, 2)")
    private double temperature;

    @Column(name = "count", nullable = false, insertable = true, updatable = true)
    private int count;

    public String getMachineNumber() {
        return machineNumber;
    }

    public void setMachineNumber(String machineNumber) {
        this.machineNumber = machineNumber;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public LocalDateTime getTimestamp() {
            return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}