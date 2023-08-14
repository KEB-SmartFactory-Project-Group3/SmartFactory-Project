package com.SpringServer.service;

import com.SpringServer.model.dto.FactoryInfoDTO;
import com.SpringServer.model.dto.GoalDTO;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.ESP32Data;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.repository.ESP32Repository;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DisplayService {

    private final ESP32Repository esp32Repository;
    private final FactoryRepository factoryRepository;

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
        FactoryInfo latestRecode = factoryRepository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getFactoryTemperature();
            int latestHumidity = latestRecode.getFactoryHumidity();
            return FactoryInfoDTO.builder()
                    .factoryTemperature(latestTemperature)
                    .factoryHumidity(latestHumidity)
                    .build();
        }
        return FactoryInfoDTO.builder()
                .factoryTemperature(0.0)
                .factoryHumidity(0)
                .build();
    }

}
