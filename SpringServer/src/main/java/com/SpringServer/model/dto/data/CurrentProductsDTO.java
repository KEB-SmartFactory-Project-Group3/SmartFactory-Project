package com.SpringServer.model.dto.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CurrentProductsDTO {

    private double nowRate;
    private int count;
    private int defectiveCount;
}
