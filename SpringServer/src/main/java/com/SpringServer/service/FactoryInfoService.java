package com.SpringServer.service;

import com.SpringServer.model.dto.MinMaxAvgTemperatureHumidityDTO;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class FactoryInfoService {

    private final FactoryRepository factoryRepository;

    public MinMaxAvgTemperatureHumidityDTO getMinMaxAvgTemperatureHumidityData(Timestamp startTimestamp, Timestamp endTimestamp) {
        Double maxTemperature = factoryRepository.findFirstByOrderByFactoryTemperatureDesc().getFactoryTemperature();
        Double minTemperature = factoryRepository.findFirstByOrderByFactoryTemperatureAsc().getFactoryTemperature();
        int maxHumidity = factoryRepository.findFirstByOrderByFactoryHumidityDesc().getFactoryHumidity();
        int minHumidity = factoryRepository.findFirstByOrderByFactoryHumidityAsc().getFactoryHumidity();

        Double avgTemperature = factoryRepository.getAverageTemperatureBetweenDates(startTimestamp, endTimestamp);
        Double avgHumidity = factoryRepository.getAverageHumidityBetweenDates(startTimestamp, endTimestamp);

        return new MinMaxAvgTemperatureHumidityDTO(maxTemperature, minTemperature, avgTemperature, maxHumidity, minHumidity, avgHumidity);
    }
}
