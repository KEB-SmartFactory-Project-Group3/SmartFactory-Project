package com.SpringServer.service;

import com.SpringServer.model.dto.FactoryInfoDTO;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.Defective;
import com.SpringServer.model.entity.MachineData;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.repository.DefectiveRepository;
import com.SpringServer.repository.MachineDataRepository;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DisplayService {

    private final MachineDataRepository machineDataRepository;
    private final FactoryRepository factoryRepository;
    private final DefectiveRepository defectiveRepository;

    private final GoalService goalService;


    public MachineInfoDTO getMachineInfo(){
        MachineData machineLatestRecode = machineDataRepository.findFirstByOrderByTimesDesc();
        Defective defectiveLatestRecode = defectiveRepository.findFirstByOrderByDefectiveCountDesc();
        if (machineLatestRecode != null && defectiveLatestRecode != null){
            int latestCount = machineLatestRecode.getCount();
            return MachineInfoDTO.builder()
                    .nowRate(goalService.calculateNowRate(latestCount))
                    .count(latestCount)
                    .defectiveCount(defectiveLatestRecode.getDefectiveCount())
                    .build();
        }
        return MachineInfoDTO.builder()
                .nowRate(0.0)
                .count(0)
                .defectiveCount(0)
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
