package com.SpringServer.controller;


import com.SpringServer.service.DisplayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/display")
public class DisplayController {

    @Autowired
    private DisplayService displayService;

    @GetMapping("/operationtime")
    public ResponseEntity<String> getOperationTime() {
        return new ResponseEntity<>(displayService.getOperationTime(), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCount(){
        return new ResponseEntity<>(displayService.getCount(), HttpStatus.OK);
    }




}
