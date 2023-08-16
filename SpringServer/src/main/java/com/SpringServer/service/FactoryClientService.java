//package com.SpringServer.service;
//
//import com.SpringServer.model.entity.FactoryInfo;
//import com.SpringServer.repository.FactoryRepository;
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
//public class FactoryClientService {
//
//    private final FactoryRepository factoryRepository;
//    private static final String URL = "http://192.168.43.247";
//
//    @Autowired
//    public FactoryClientService(FactoryRepository factoryRepository){
//        this.factoryRepository = factoryRepository;
//    }
//
//    @Scheduled(fixedDelay = 1000)
//    public void fetchDataAndSave() {
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<FactoryInfo> response = restTemplate.getForEntity(URL, FactoryInfo.class);
//
//        if(response.getStatusCode() == HttpStatus.OK){
//            FactoryInfo factoryInfo = response.getBody();
//            factoryRepository.save(factoryInfo);
//        }else{
//            throw new IllegalArgumentException("API 호출 실패");
//        }
//    }
//
//}
