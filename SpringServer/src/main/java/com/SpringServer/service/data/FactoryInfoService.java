package com.SpringServer.service;


import com.SpringServer.model.dto.CurrentFactoryInfoDTO;
import com.SpringServer.model.dto.StatisticsTemperatureHumidityDTO;
import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.repository.FactoryInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FactoryInfoService {

    private final FactoryInfoRepository factoryInfoRepository;

    public StringResultResponse saveFactoryInfo(FactoryInfo factoryInfo) {
        var factoryInfoData = FactoryInfo.builder()
                .factoryHumidity(factoryInfo.getFactoryHumidity())
                .factoryTemperature(factoryInfo.getFactoryTemperature())
                .times(factoryInfo.getTimes())
                .isValid(factoryInfo.isValid())
                .build();
        try {
            factoryInfoRepository.save(factoryInfoData);
            return StringResultResponse.builder()
                    .result("온습도 저장이 완료되었습니다.")
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("온습도 저장에 실패했습니다.");
        }
    }

    public StatisticsTemperatureHumidityDTO getStatisticsTemperatureHumidityData() {
        Double maxTemperature = factoryInfoRepository.findFirstByOrderByFactoryTemperatureDesc().getFactoryTemperature();
        Double minTemperature = factoryInfoRepository.findFirstByOrderByFactoryTemperatureAsc().getFactoryTemperature();
        int maxHumidity = factoryInfoRepository.findFirstByOrderByFactoryHumidityDesc().getFactoryHumidity();
        int minHumidity = factoryInfoRepository.findFirstByOrderByFactoryHumidityAsc().getFactoryHumidity();

        Double RawAvgTemperature = factoryInfoRepository.getAverageTemperature();
        Double RawAvgHumidity = factoryInfoRepository.getAverageHumidity();

        Double roundedAvgTemperature = Math.round(RawAvgTemperature * 10) / 10.0;
        Double roundedAvgHumidity = Math.round(RawAvgHumidity * 10) / 10.0;

        return StatisticsTemperatureHumidityDTO.builder()
                .maxHumidity(maxHumidity)
                .minHumidity(minHumidity)
                .avgHumidity(roundedAvgHumidity)
                .maxTemperature(maxTemperature)
                .minTemperature(minTemperature)
                .avgTemperature(roundedAvgTemperature)
                .build();
    }

    public CurrentFactoryInfoDTO getFactoryInfo(){
        FactoryInfo latestRecode = factoryInfoRepository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getFactoryTemperature();
            int latestHumidity = latestRecode.getFactoryHumidity();
            return CurrentFactoryInfoDTO.builder()
                    .factoryTemperature(latestTemperature)
                    .factoryHumidity(latestHumidity)
                    .build();
        }
        return CurrentFactoryInfoDTO.builder()
                .factoryTemperature(0.0)
                .factoryHumidity(0)
                .build();
    }

    public List<FactoryInfo> findAllOutliers() {
        return factoryInfoRepository.findByIsValidFalse();
    }
}
