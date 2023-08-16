package com.SpringServer.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "defective")
public class Defective {

    @Id
    private String serialNumber;
    private int count;
    private int defectiveCount;

    private String state;
}
