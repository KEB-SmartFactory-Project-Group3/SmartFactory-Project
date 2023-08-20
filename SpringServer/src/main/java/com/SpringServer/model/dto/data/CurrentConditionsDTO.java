package com.SpringServer.model.dto.data;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CurrentConditionDTO {

    private double factoryTemperature;
    private int factoryHumidity;
}
