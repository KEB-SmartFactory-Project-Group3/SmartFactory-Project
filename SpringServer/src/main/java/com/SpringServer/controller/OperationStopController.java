package com.SpringServer.controller;


import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.service.OperationStopService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/operationstop")
public class OperationStopController {

    private final OperationStopService operationStopService;
    @GetMapping("/totallist")
    public ResponseEntity<List<OperationStop>> getAllOperationStops() {
        return ResponseEntity.ok(operationStopService.findAllOperationStop());
    }
}
