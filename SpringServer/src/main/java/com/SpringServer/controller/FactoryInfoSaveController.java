package com.SpringServer.controller;

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

    @GetMapping("/outlierlist")
    public ResponseEntity<List<FactoryInfo>> getAllOutliers() {
        return ResponseEntity.ok(factoryInfoService.findAllOutliers());
    }
}
