package com.SpringServer.controller;


//import com.SpringServer.model.dto.CountDTO;
//import com.SpringServer.model.dto.TemperatureDTO;
//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.dto.ButtonRequest;
import com.SpringServer.model.dto.ButtonResponse;
import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.dto.RegisterRequest;
import com.SpringServer.service.DisplayService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/display")
public class DisplayController {

    private final DisplayService displayService;



    @GetMapping("/machineinfo")
    public ResponseEntity<MachineInfoDTO> displayMachineInfo(){
        return ResponseEntity.ok(displayService.getMachineInfo());
    }

    @PostMapping("/button")
    public ResponseEntity<ButtonResponse> OnOffEsp32Board(@RequestBody ButtonRequest request){
        return  ResponseEntity.ok(displayService.onOffEsp32Board(request));
    }

//    @GetMapping("/operationtime")
//    public ResponseEntity<TimesDTO> displayOperationTime() {
//        return ResponseEntity.ok(displayService.getOperationTime());
//    }
//
//    @GetMapping("/count")
//    public ResponseEntity<CountDTO> displayCount(){
//        return ResponseEntity.ok(displayService.getCount());
//    }
//
//    @GetMapping("/temperature")
//    public ResponseEntity<TemperatureDTO> displayTemperature(){
//        return ResponseEntity.ok(displayService.getTemperature());
//    }




}
