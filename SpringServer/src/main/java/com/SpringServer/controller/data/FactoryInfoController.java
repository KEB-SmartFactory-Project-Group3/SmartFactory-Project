package com.SpringServer.controller;

import com.SpringServer.model.dto.CurrentFactoryInfoDTO;
import com.SpringServer.model.dto.StatisticsTemperatureHumidityDTO;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.service.FactoryInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/factoryinfo")
public class FactoryInfoSaveController {

    private final FactoryInfoService factoryInfoService;

    @PostMapping("/data")
    public ResponseEntity<?> saveMachineData(@RequestBody FactoryInfo factoryInfo) {
        return  ResponseEntity.ok(factoryInfoService.saveFactoryInfo(factoryInfo));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentFactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(factoryInfoService.getFactoryInfo());
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsTemperatureHumidityDTO> displayStatistics(){
        return ResponseEntity.ok(factoryInfoService.getStatisticsTemperatureHumidityData());
    }

    @GetMapping("/outlierlist")
    public ResponseEntity<List<FactoryInfo>> getAllOutliers() {
        return ResponseEntity.ok(factoryInfoService.findAllOutliers());
    }
}
