package com.SpringServer.controller.data;

import com.SpringServer.model.dto.data.CurrentConditionsDTO;
import com.SpringServer.model.dto.data.ConditionsStatisticsDTO;
import com.SpringServer.model.entity.Conditions;
import com.SpringServer.service.data.ConditionsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/conditions")
public class ConditionsController {

    private final ConditionsService conditionsService;

    @PostMapping("/save")
    public ResponseEntity<?> saveMachineData(@RequestBody Conditions conditions) {
        return  ResponseEntity.ok(conditionsService.saveConditions(conditions));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentConditionsDTO> displayConditions(){
        return ResponseEntity.ok(conditionsService.getCurrentConditions());
    }

    @GetMapping("/statistics")
    public ResponseEntity<ConditionsStatisticsDTO> displayStatistics(){
        return ResponseEntity.ok(conditionsService.getStatisticsTemperatureHumidityData());
    }

    @GetMapping("/outlierlist")
    public ResponseEntity<List<Conditions>> getAllOutliers() {
        return ResponseEntity.ok(conditionsService.findAllOutliers());
    }
}
