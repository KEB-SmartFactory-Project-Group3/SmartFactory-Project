package com.SpringServer.controller;


import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.repository.ESP32Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Timestamp;

@Controller
@RequestMapping("/api/display")
public class DisplayController {

    @Autowired
    private ESP32Repository esp32Repository;

    @GetMapping("/operationtime")
    public ResponseEntity<String> getOperationTime() {
        ESP32Data firstRecord = esp32Repository.findFirstRecord();

        if (firstRecord != null) {
            Timestamp firstTime = firstRecord.getTimes();
            Timestamp now = new Timestamp(System.currentTimeMillis());
            long duration = now.getTime() - firstTime.getTime();

            long totalSeconds = duration / 1000;
            long hours = totalSeconds / 3600;
            long minutes = (totalSeconds % 3600) / 60;
            long seconds = totalSeconds % 60;

            System.out.println(firstRecord);
            System.out.println(firstTime);
            System.out.println(now);
            System.out.println(hours+"시간" + minutes + "분" + seconds + "초");

            return new ResponseEntity<>(String.format("%02d시간 %02d분 %02d초", hours, minutes, seconds), HttpStatus.OK);
        }

        return new ResponseEntity<>(String.format("%02d시간 %02d분 %02d초", 0, 0, 0), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCount(){

        return null;
    }
}
