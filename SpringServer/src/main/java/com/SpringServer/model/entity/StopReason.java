package com.SpringServer.model.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stopreason")
public class StopReason {
    @Id
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp operationStopTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:MM:SS")
    private Time operationTime;
    private String userName;
    private String reason;
    private double nowGoal;

}
