package com.SpringServer.service;

import com.SpringServer.model.dto.FactoryInfoDTO;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.MachineData;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.repository.MachineDataRepository;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DisplayService {

    private final MachineDataRepository machineDataRepository;
    private final FactoryRepository factoryRepository;

    private final GoalService goalService;


    public MachineInfoDTO getMachineInfo(){
        MachineData latestRecode = machineDataRepository.findFirstByOrderByTimesDesc();
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
