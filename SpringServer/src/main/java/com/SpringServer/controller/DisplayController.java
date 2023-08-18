package com.SpringServer.controller;



import com.SpringServer.model.dto.*;
import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.service.DisplayService;
import com.SpringServer.service.StatisticsTemperatureHumidityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/display")
public class DisplayController {

    private final DisplayService displayService;
    private final StatisticsTemperatureHumidityService statisticsTemperatureHumidityService;


    @GetMapping("/machineinfo")
    public ResponseEntity<CountDTO> displayMachineInfo(){
        return ResponseEntity.ok(displayService.getProductsCount());
    }

    @GetMapping("/factoryinfo")
    public ResponseEntity<FactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(displayService.getFactoryInfo());
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsTemperatureHumidityDTO> displayStatistics(){
        return ResponseEntity.ok(statisticsTemperatureHumidityService.getStatisticsTemperatureHumidityData());
    }

    @GetMapping("/operationstoplist")
    public ResponseEntity<List<OperationStop>> getAllOperationStops() {
        return ResponseEntity.ok(displayService.findAllOperationStop());
    }

}
