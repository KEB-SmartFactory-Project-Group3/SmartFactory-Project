package com.SpringServer.service;

import com.SpringServer.model.dto.ButtonRequest;
import com.SpringServer.model.dto.ButtonResponse;
import com.SpringServer.model.entity.StopReason;
import com.SpringServer.repository.StopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ButtonService {

    private final GoalService goalService;

    private final String URL = "http://172.20.10.11";
    private final StopRepository stopRepository;

    public ButtonResponse saveStopReason(ButtonRequest request){
        var stopReason = StopReason.builder()
                .operationStopTime(request.getOperationStopTime())
                .operationTime(request.getOperationTime())
                .userName(request.getUserName())
                .reason(request.getReason())
                .nowGoal(goalService.calculateNowRate(request.getCount()))
                .build();
        System.out.println(request.getUserName() + request.getState());
//        onOffEsp32Board(request);
        stopRepository.save(stopReason);
        return ButtonResponse.builder()
                .result("saved")
                .build();
    }

    public String onOffEsp32Board(ButtonRequest request){
        RestTemplate restTemplate = new RestTemplate();
        String responseMessage = null;
        if(request.getState().equals("stop")){
            String stopURL = URL + "/red_led_off";
            responseMessage = restTemplate.getForObject(stopURL, String.class);
        } else if (request.getState().equals("start")) {
            String startURL = URL + "/red_led_on";
            responseMessage = restTemplate.getForObject(startURL, String.class);
        } else if (request.getState().equals("reset")) {
            String resetURL = URL + "/reset";
            responseMessage = restTemplate.getForObject(resetURL, String.class);
        } else{
            throw new IllegalArgumentException("ESP32 command 실패");
        }
        return responseMessage;
    }
}
