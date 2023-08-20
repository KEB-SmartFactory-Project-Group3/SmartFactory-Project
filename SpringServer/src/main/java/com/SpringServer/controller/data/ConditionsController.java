package com.SpringServer.controller.data;

import com.SpringServer.model.dto.data.CurrentConditionDTO;
import com.SpringServer.model.dto.data.ConditionStatisticsDTO;
import com.SpringServer.model.entity.Condition;
import com.SpringServer.service.data.ConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/condition")
public class ConditionController {

    private final ConditionService conditionService;

    @PostMapping("/save")
    public ResponseEntity<?> saveMachineData(@RequestBody Condition condition) {
        return  ResponseEntity.ok(conditionService.saveCondition(condition));
    }

    @GetMapping("/current")
    public ResponseEntity<CurrentConditionDTO> displayConditions(){
        return ResponseEntity.ok(conditionService.getCurrentCondition());
    }

    @GetMapping("/statistics")
    public ResponseEntity<ConditionStatisticsDTO> displayStatistics(){
        return ResponseEntity.ok(conditionService.getStatisticsTemperatureHumidityData());
    }

    @GetMapping("/outlierlist")
    public ResponseEntity<List<Condition>> getAllOutliers() {
        return ResponseEntity.ok(conditionService.findAllOutliers());
    }
}
