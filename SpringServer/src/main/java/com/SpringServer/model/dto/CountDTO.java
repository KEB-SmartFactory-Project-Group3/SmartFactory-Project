package com.SpringServer.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CountDTO {

    private double nowRate;
    private int count;
    private int defectiveCount;
}
