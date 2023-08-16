package com.SpringServer.controller;

import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.model.entity.MachineData;
import com.SpringServer.repository.FactoryRepository;
import com.SpringServer.repository.MachineDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/factoryinfo")
public class FactoryInfoController {

    public final FactoryRepository factoryRepository;

    @Autowired
    public FactoryInfoController(FactoryRepository factoryRepository) {
        this.factoryRepository = factoryRepository;
    }

    @PostMapping("/data")
    public ResponseEntity<?> saveMachineData(@RequestBody FactoryInfo factoryInfo) {
        factoryRepository.save(factoryInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
