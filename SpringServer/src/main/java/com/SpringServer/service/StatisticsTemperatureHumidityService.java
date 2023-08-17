package com.SpringServer.service;

import com.SpringServer.model.dto.StatisticsTemperatureHumidityDTO;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatisticsTemperatureHumidityService {

    private final FactoryRepository factoryRepository;

    public StatisticsTemperatureHumidityDTO getStatisticsTemperatureHumidityData() {
        Double maxTemperature = factoryRepository.findFirstByOrderByFactoryTemperatureDesc().getFactoryTemperature();
        Double minTemperature = factoryRepository.findFirstByOrderByFactoryTemperatureAsc().getFactoryTemperature();
        int maxHumidity = factoryRepository.findFirstByOrderByFactoryHumidityDesc().getFactoryHumidity();
        int minHumidity = factoryRepository.findFirstByOrderByFactoryHumidityAsc().getFactoryHumidity();

        Double RawAvgTemperature = factoryRepository.getAverageTemperature();
        Double RawAvgHumidity = factoryRepository.getAverageHumidity();

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
}
