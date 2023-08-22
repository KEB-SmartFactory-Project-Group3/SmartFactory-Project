package com.SpringServer.service.data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private String city = "Seoul";

    @Value("${OpenWeatherMap_Api_Key}")
    private String apiKey;
    private String apiBaseURL = "http://api.openweathermap.org/data/2.5/weather";
    private RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> getWeather() {
        String requestURL = apiBaseURL + "?q=" + city + "&appid=" + apiKey;
        ResponseEntity<String> response = restTemplate.getForEntity(requestURL, String.class);
        return response;
    }
}
