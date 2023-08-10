package com.SpringServer.service;

//import com.SpringServer.model.dto.CountDTO;
//import com.SpringServer.model.dto.TemperatureDTO;
//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.dto.ButtonRequest;
import com.SpringServer.model.dto.ButtonResponse;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.model.entity.StopReason;
import com.SpringServer.repository.ESP32Repository;
import com.SpringServer.repository.StopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.plaf.PanelUI;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class DisplayService {


    private final ESP32Repository esp32Repository;

    private final StopService stopService;
    private final StopRepository stopRepository;

//    public TimesDTO getOperationTime(){
//        ESP32Data firstRecord = esp32Repository.findFirstByOrderByTimesAsc();
//
//        if (firstRecord != null) {
//            Timestamp firstTime = firstRecord.getTimes();
//            Timestamp now = new Timestamp(System.currentTimeMillis());
//            long duration = now.getTime() - firstTime.getTime();
//
//            long totalSeconds = duration / 1000;
//            long hours = totalSeconds / 3600;
//            long minutes = (totalSeconds % 3600) / 60;
//            long seconds = totalSeconds % 60;
//
//            String formattedDuration = String.format("%02d시간 %02d분 %02d초", hours, minutes, seconds);
//
//            return TimesDTO.builder()
//                    .operationTime(formattedDuration)
//                    .build();
//        }
//        return TimesDTO.builder()
//                .operationTime(String.format("%02d시간 %02d분 %02d초", 0, 0, 0))
//                .build();
//    }
//
//    public CountDTO getCount(){
//        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();
//
//        if (latestRecode != null) {
//            int latestCount = latestRecode.getCount();
//            return CountDTO.builder()
//                    .count(latestCount)
//                    .build();
//        }
//        return CountDTO.builder()
//                .count(0)
//                .build();
//    }
//
//    public TemperatureDTO getTemperature(){
//        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();
//
//        if (latestRecode != null){
//            double latestTemperature = latestRecode.getTemperature();
//            return TemperatureDTO.builder()
//                    .temperature(latestTemperature)
//                    .build();
//        }
//        return TemperatureDTO.builder()
//                .temperature(0.0)
//                .build();
//    }

    public MachineInfoDTO getMachineInfo(){
        ESP32Data firstRecord = esp32Repository.findFirstByOrderByTimesAsc();
        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();
        if (firstRecord != null && latestRecode != null){
            Timestamp firstTime = firstRecord.getTimes();
            double latestTemperature = latestRecode.getTemperature();
            int latestCount = latestRecode.getCount();
            return MachineInfoDTO.builder()
                    .operationStartTime(firstTime)
                    .temperature(latestTemperature)
                    .count(latestCount)
                    .build();
        }
        return MachineInfoDTO.builder()
                .operationStartTime(Timestamp.valueOf("0시간 0분 0초"))
                .temperature(0.0)
                .count(0)
                .build();
    }

    public ButtonResponse onOffEsp32Board(ButtonRequest request){
        var stopReason = StopReason.builder()
                .operationStopTime(request.getOperationStopTime())
                .operationTime(request.getOperationTime())
                .userName(request.getUserName())
                .machineNumber(request.getMachineNumber())
                .reason(request.getReason())
                .nowGoal(stopService.calculateNowGoal(request.getCount()))
                .build();
        stopRepository.save(stopReason);
        return ButtonResponse.builder()
                .result("saved")
                .build();
    }
}
