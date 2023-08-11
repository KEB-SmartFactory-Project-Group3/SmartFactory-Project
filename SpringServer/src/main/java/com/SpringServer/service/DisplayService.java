package com.SpringServer.service;

import com.SpringServer.model.dto.FactoryInfoDTO;
import com.SpringServer.model.dto.GoalDTO;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.repository.ESP32Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DisplayService {

    private final ESP32Repository esp32Repository;

    private final GoalService goalService;


    public MachineInfoDTO getMachineInfo(){
        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            int latestCount = latestRecode.getCount();
            return MachineInfoDTO.builder()
                    .nowRate(goalService.calculateNowRate(latestCount))
                    .count(latestCount)
                    .build();
        }
        return MachineInfoDTO.builder()
                .nowRate(0.0)
                .count(0)
                .build();
    }

    public FactoryInfoDTO getFactoryInfo(){
        ESP32Data latestRecode = esp32Repository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getTemperature();
            double latestHumidity = latestRecode.getHumidity();
            return FactoryInfoDTO.builder()
                    .temperature(latestTemperature)
                    .humidity(latestHumidity)
                    .build();
        }
        return FactoryInfoDTO.builder()
                .temperature(0.0)
                .humidity(0.0)
                .build();
    }

}
