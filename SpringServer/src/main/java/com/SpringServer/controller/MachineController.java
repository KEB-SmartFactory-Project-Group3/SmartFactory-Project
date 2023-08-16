package com.SpringServer.controller;

import com.SpringServer.model.entity.MachineData;
import com.SpringServer.repository.MachineDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/machine")
public class MachineController {

    private final MachineDataRepository machineDataRepository;

    @Autowired
    public MachineController(MachineDataRepository machineDataRepository) {
        this.machineDataRepository = machineDataRepository;
    }

    @PostMapping("/data")
    public ResponseEntity<?> saveMachineData(@RequestBody MachineData machineData) {
        machineDataRepository.save(machineData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}