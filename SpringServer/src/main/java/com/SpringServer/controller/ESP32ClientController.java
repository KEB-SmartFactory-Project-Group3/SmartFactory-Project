//package com.SpringServer.controller;
//
//import com.SpringServer.model.dto.ESP32Data;
//import com.SpringServer.repository.ESP32Repository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//@EnableScheduling
//public class ESP32ClientController {
//
//    private final ESP32Repository esp32Repository;
//
//    private static final String URL = "http://192.168.15.138/data";
//
//    @Autowired
//    public ESP32ClientController(ESP32Repository esp32Repository) {
//        this.esp32Repository = esp32Repository;
//    }
//
//    @Scheduled(fixedDelay = 10000)
//    public void fetchDataAndSave() {
//        String requestUrl = URL;
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<ESP32Data> response = restTemplate.getForEntity(requestUrl, ESP32Data.class);
//
//        if(response.getStatusCode() == HttpStatus.OK){
//            ESP32Data esp32Data = response.getBody();
//            esp32Repository.save(esp32Data);
//        }else{
//            throw new IllegalArgumentException("API 호출 실패");
//        }
//    }
//}