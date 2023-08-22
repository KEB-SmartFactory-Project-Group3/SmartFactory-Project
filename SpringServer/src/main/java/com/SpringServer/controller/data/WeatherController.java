package com.SpringServer.controller.data;

import com.SpringServer.service.data.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WeatherController {
    private final WeatherService weatherService;


    @GetMapping("/weather")
    public ResponseEntity<String> getCurrentWeather() {
        return weatherService.getWeather();
    }
}

