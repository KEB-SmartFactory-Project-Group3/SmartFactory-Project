//package com.SpringServer.service;
//
//import jakarta.annotation.PostConstruct;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.select.Elements;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//
//@Service
//public class WeatherService {
//
//    private static String WEATHER_URL = "http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=2817755000";
//
//    @PostConstruct
//    public void getOutsideWeather() throws IOException{
//        Document doc = Jsoup.connect(WEATHER_URL).get();
//        Elements contents = doc.select("temp");
//    }
//}
