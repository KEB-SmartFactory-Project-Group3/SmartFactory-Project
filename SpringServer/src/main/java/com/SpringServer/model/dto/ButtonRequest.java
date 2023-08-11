package com.SpringServer.model.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ButtonRequest {

    private String userName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp operationStopTime;     // 00년 00월 00일 00시 00분 00초

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private Time operationTime;         // 00시간 00분 00초
    private String reason;  // "휴식", "수리"...
    private int count;

    private String state;   // "가동중지", "재가동", "reset"



}
