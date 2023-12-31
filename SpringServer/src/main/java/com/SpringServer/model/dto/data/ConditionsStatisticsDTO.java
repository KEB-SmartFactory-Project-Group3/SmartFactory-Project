package com.SpringServer.model.dto.data;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConditionsStatisticsDTO {
    private Double maxTemperature;
    private Double minTemperature;
    private Double avgTemperature;
    private int maxHumidity;
    private int minHumidity;
    private Double avgHumidity;
}
