//package com.SpringServer.service;
//
//import com.SpringServer.model.entity.ESP32Data;
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
//public class ESP32ClientService {
//
//    private final ESP32Repository esp32Repository;
//
//    private static final String URL = "http://172.20.10.11/data";
//
//    @Autowired
//    public ESP32ClientService(ESP32Repository esp32Repository) {
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
//
//}