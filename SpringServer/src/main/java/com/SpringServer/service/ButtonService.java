package com.SpringServer.service;

import com.SpringServer.model.dto.ButtonRequest;
import com.SpringServer.model.dto.ButtonResponse;
import com.SpringServer.model.entity.StopReason;
import com.SpringServer.repository.StopRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.boot.json.JsonParser;
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
                .nowRate(goalService.calculateNowRate(request.getCount()))
                .build();

        onOffSpring(onOffEsp32Board(request));

        stopRepository.save(stopReason);
        return ButtonResponse.builder()
                .result("saved")
                .build();
    }

    public String onOffEsp32Board(ButtonRequest request){
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = null;
        if (request.getState().equals("stop")) {
            String stopURL = URL + "/red_led_off";
            jsonResponse = restTemplate.getForObject(stopURL, String.class);
        } else if (request.getState().equals("start")) {
            String startURL = URL + "/red_led_on";
            jsonResponse = restTemplate.getForObject(startURL, String.class);
        } else if (request.getState().equals("reset")) {
            String resetURL = URL + "/reset";
            jsonResponse = restTemplate.getForObject(resetURL, String.class);
        } else {
            throw new IllegalArgumentException("ESP32 command 실패");
        }

        JSONObject jsonObject = new JSONObject(jsonResponse);
        return jsonObject.getString("message");
    }

    public void onOffSpring(String jsonResponse){
        if(jsonResponse.equals("ESP32 Start")){

        } else if (jsonResponse.equals("ESP32 Stop")) {

        } else if (jsonResponse.equals("ESP32 Reset")) {

        } else{
            throw new IllegalArgumentException("ESP32 command 실패");
        }
    }
}
