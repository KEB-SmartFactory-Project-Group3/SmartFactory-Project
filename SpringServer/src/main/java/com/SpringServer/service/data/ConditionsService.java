package com.SpringServer.service.data;


import com.SpringServer.model.dto.data.CurrentConditionsDTO;
import com.SpringServer.model.dto.data.ConditionsStatisticsDTO;
import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.entity.Conditions;
import com.SpringServer.repository.ConditionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConditionsService {

    private final ConditionsRepository conditionsRepository;

    public StringResultResponse saveConditions(Conditions conditions) {
        var condition = Conditions.builder()
                .factoryHumidity(conditions.getFactoryHumidity())
                .factoryTemperature(conditions.getFactoryTemperature())
                .times(conditions.getTimes())
                .isValid(conditions.isValid())
                .build();
        try {
            conditionsRepository.save(condition);
            return StringResultResponse.builder()
                    .result("온습도 저장이 완료되었습니다.")
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("온습도 저장에 실패했습니다.");
        }
    }

    public CurrentConditionsDTO getCurrentConditions(){
        Conditions latestRecode = conditionsRepository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getFactoryTemperature();
            int latestHumidity = latestRecode.getFactoryHumidity();
            return CurrentConditionsDTO.builder()
                    .factoryTemperature(latestTemperature)
                    .factoryHumidity(latestHumidity)
                    .build();
        }
        return CurrentConditionsDTO.builder()
                .factoryTemperature(0.0)
                .factoryHumidity(0)
                .build();
    }

    public ConditionsStatisticsDTO getStatisticsTemperatureHumidityData() {
        Double maxTemperature = conditionsRepository.findFirstByOrderByFactoryTemperatureDesc().getFactoryTemperature();
        Double minTemperature = conditionsRepository.findFirstByOrderByFactoryTemperatureAsc().getFactoryTemperature();
        int maxHumidity = conditionsRepository.findFirstByOrderByFactoryHumidityDesc().getFactoryHumidity();
        int minHumidity = conditionsRepository.findFirstByOrderByFactoryHumidityAsc().getFactoryHumidity();

        Double RawAvgTemperature = conditionsRepository.getAverageTemperature();
        Double RawAvgHumidity = conditionsRepository.getAverageHumidity();

        Double roundedAvgTemperature = Math.round(RawAvgTemperature * 10) / 10.0;
        Double roundedAvgHumidity = Math.round(RawAvgHumidity * 10) / 10.0;

        return ConditionsStatisticsDTO.builder()
                .maxHumidity(maxHumidity)
                .minHumidity(minHumidity)
                .avgHumidity(roundedAvgHumidity)
                .maxTemperature(maxTemperature)
                .minTemperature(minTemperature)
                .avgTemperature(roundedAvgTemperature)
                .build();
    }

    public List<Conditions> findAllOutliers() {
        return conditionsRepository.findByIsValidFalse();
    }
}
