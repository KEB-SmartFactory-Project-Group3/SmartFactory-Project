package com.SpringServer.model.dto;

import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.model.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@Data
public class TimesDTO {
    private Timestamp times;

    public TimesDTO(ESP32Data esp32Data){
        this.times = esp32Data.getTimes();
    }
}
