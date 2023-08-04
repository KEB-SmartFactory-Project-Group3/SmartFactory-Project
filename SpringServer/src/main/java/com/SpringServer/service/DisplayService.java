package com.SpringServer.service;

import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.repository.ESP32Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class DisplayService {

    @Autowired
    private ESP32Repository esp32Repository;

    public String getOperationTime(){
        ESP32Data firstRecord = esp32Repository.findFirstByOrderByTimesAsc();

        if (firstRecord != null) {
            Timestamp firstTime = firstRecord.getTimes();
            Timestamp now = new Timestamp(System.currentTimeMillis());
            long duration = now.getTime() - firstTime.getTime();

            long totalSeconds = duration / 1000;
            long hours = totalSeconds / 3600;
            long minutes = (totalSeconds % 3600) / 60;
            long seconds = totalSeconds % 60;

            return String.format("%02d시간 %02d분 %02d초", hours, minutes, seconds);
        }
        return String.format("%02d시간 %02d분 %02d초", 0, 0, 0);
    }

    public Integer getCount(){
        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();

        if (latestRecode != null) {
            int latestCount = latestRecode.getCount();
            return latestCount;
        }
        return 0;
    }
}
