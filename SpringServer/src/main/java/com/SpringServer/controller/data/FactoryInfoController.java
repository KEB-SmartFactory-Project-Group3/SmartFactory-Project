package com.SpringServer.controller.data;

import com.SpringServer.model.dto.data.CurrentFactoryInfoDTO;
import com.SpringServer.model.dto.data.StatisticsFactoryInfoDTO;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.service.data.FactoryInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/factoryinfo")
public class FactoryInfoController {

    private final FactoryInfoService factoryInfoService;

    @PostMapping("/save")
    public ResponseEntity<?> saveMachineData(@RequestBody FactoryInfo factoryInfo) {
        return  ResponseEntity.ok(factoryInfoService.saveFactoryInfo(factoryInfo));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentFactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(factoryInfoService.getFactoryInfo());
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsFactoryInfoDTO> displayStatistics(){
        return ResponseEntity.ok(factoryInfoService.getStatisticsTemperatureHumidityData());
    }

    @GetMapping("/outlierlist")
    public ResponseEntity<List<FactoryInfo>> getAllOutliers() {
        return ResponseEntity.ok(factoryInfoService.findAllOutliers());
    }
}
