package com.SpringServer.controller;

import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.service.FactoryInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/factoryinfo")
public class FactoryInfoController {

    private final FactoryInfoService factoryInfoService;

    @PostMapping("/data")
    public ResponseEntity<?> saveMachineData(@RequestBody FactoryInfo factoryInfo) {
        return  ResponseEntity.ok(factoryInfoService.saveFactoryInfo(factoryInfo));
    }
}
