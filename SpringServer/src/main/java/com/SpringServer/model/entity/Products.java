package com.SpringServer.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@Entity
@Table(name = "products")
@IdClass(ProductsId.class)
public class Products {
    @Id
    private String machineNumber;
    @Id
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp times;
    private double temperature;
    private int count;

    @Builder
    public Products(String machineNumber, Timestamp times, double temperature, int count) {
        this.machineNumber = machineNumber;
        this.times = times;
        this.temperature = temperature;
        this.count = count;
    }



}
