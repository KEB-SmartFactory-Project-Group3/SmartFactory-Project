package com.SpringServer.controller;

import com.SpringServer.model.entity.MachineData;
import com.SpringServer.repository.MachineDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/machine")
@RequiredArgsConstructor
public class MachineContorller {

    private final MachineDataRepository machineDataRepository;

    @Scheduled(fixedDelay = 1000)
    public void fetchDataAndSave() {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MachineData> response = restTemplate.getForEntity(URL, MachineData.class);

        if(response.getStatusCode() == HttpStatus.OK){
            MachineData esp32Data = response.getBody();
            machineDataRepository.save(esp32Data);
        }else{
            throw new IllegalArgumentException("API 호출 실패");
        }
    }

}