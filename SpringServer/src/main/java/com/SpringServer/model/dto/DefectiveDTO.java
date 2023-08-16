package com.SpringServer.model.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DefectiveDTO {
    private String serialNumber;
    private int count;
    private int defectiveCount;

    private String state;
}
