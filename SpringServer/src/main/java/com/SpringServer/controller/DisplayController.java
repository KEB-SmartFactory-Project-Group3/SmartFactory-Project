package com.SpringServer.controller;



import com.SpringServer.model.dto.*;
import com.SpringServer.service.FactoryInfoService;
import com.SpringServer.service.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/display")
public class DisplayController {

    private final ProductsService productsService;
    private final FactoryInfoService factoryInfoService;


    @GetMapping("/machineinfo")
    public ResponseEntity<CountDTO> displayMachineInfo(){
        return ResponseEntity.ok(productsService.getProductsCount());
    }

    @GetMapping("/factoryinfo")
    public ResponseEntity<CurrentFactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(factoryInfoService.getFactoryInfo());
    }

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsTemperatureHumidityDTO> displayStatistics(){
        return ResponseEntity.ok(factoryInfoService.getStatisticsTemperatureHumidityData());
    }

}
