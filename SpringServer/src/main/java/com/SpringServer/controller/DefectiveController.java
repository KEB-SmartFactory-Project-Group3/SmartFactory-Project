package com.SpringServer.controller;


import com.SpringServer.model.dto.ButtonRequest;
import com.SpringServer.model.dto.DefectiveDTO;
import com.SpringServer.service.DefectiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DefectiveController {

    private final DefectiveService defectiveService;

    @PostMapping("/defective")
    public ResponseEntity<String> receiveData(@RequestBody DefectiveDTO defectiveDTO) {
        return ResponseEntity.ok(defectiveService.saveDefective(defectiveDTO));
    }
}
