package com.start.first.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class ProductsId implements Serializable {
    private String machineNumber;
    private LocalDateTime timestamp;

    public ProductsId() {
    }

    public ProductsId(String machineNumber, LocalDateTime timestamp) {
        this.machineNumber = machineNumber;
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductsId that = (ProductsId) o;
        return Objects.equals(machineNumber, that.machineNumber) && Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(machineNumber, timestamp);
    }
}