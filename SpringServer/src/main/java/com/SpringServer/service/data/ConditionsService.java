package com.SpringServer.service.data;


import com.SpringServer.model.dto.data.CurrentConditionDTO;
import com.SpringServer.model.dto.data.ConditionStatisticsDTO;
import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.entity.Condition;
import com.SpringServer.repository.ConditionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConditionService {

    private final ConditionRepository conditionRepository;

    public StringResultResponse saveCondition(Condition condition) {
        var conditionData = Condition.builder()
                .factoryHumidity(condition.getFactoryHumidity())
                .factoryTemperature(condition.getFactoryTemperature())
                .times(condition.getTimes())
                .isValid(condition.isValid())
                .build();
        try {
            conditionRepository.save(conditionData);
            return StringResultResponse.builder()
                    .result("온습도 저장이 완료되었습니다.")
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("온습도 저장에 실패했습니다.");
        }
    }

    public CurrentConditionDTO getCurrentCondition(){
        Condition latestRecode = conditionRepository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getFactoryTemperature();
            int latestHumidity = latestRecode.getFactoryHumidity();
            return CurrentConditionDTO.builder()
                    .factoryTemperature(latestTemperature)
                    .factoryHumidity(latestHumidity)
                    .build();
        }
        return CurrentConditionDTO.builder()
                .factoryTemperature(0.0)
                .factoryHumidity(0)
                .build();
    }

    public ConditionStatisticsDTO getStatisticsTemperatureHumidityData() {
        Double maxTemperature = conditionRepository.findFirstByOrderByFactoryTemperatureDesc().getFactoryTemperature();
        Double minTemperature = conditionRepository.findFirstByOrderByFactoryTemperatureAsc().getFactoryTemperature();
        int maxHumidity = conditionRepository.findFirstByOrderByFactoryHumidityDesc().getFactoryHumidity();
        int minHumidity = conditionRepository.findFirstByOrderByFactoryHumidityAsc().getFactoryHumidity();

        Double RawAvgTemperature = conditionRepository.getAverageTemperature();
        Double RawAvgHumidity = conditionRepository.getAverageHumidity();

        Double roundedAvgTemperature = Math.round(RawAvgTemperature * 10) / 10.0;
        Double roundedAvgHumidity = Math.round(RawAvgHumidity * 10) / 10.0;

        return ConditionStatisticsDTO.builder()
                .maxHumidity(maxHumidity)
                .minHumidity(minHumidity)
                .avgHumidity(roundedAvgHumidity)
                .maxTemperature(maxTemperature)
                .minTemperature(minTemperature)
                .avgTemperature(roundedAvgTemperature)
                .build();
    }

    public List<Condition> findAllOutliers() {
        return conditionRepository.findByIsValidFalse();
    }
}
