package com.SpringServer.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ButtonRequest {

    private String userName;
    private String machineNumber;
    private Timestamp operationStopTime;
    private Time operationTime;
    private String reason;
    private int count;



}
