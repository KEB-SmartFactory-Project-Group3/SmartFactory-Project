package com.SpringServer.controller;


//import com.SpringServer.model.dto.CountDTO;
//import com.SpringServer.model.dto.TemperatureDTO;
//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.dto.*;
import com.SpringServer.service.DisplayService;
import com.SpringServer.service.ButtonService;
import com.SpringServer.service.GoalService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/factoryinfo")
    public ResponseEntity<FactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(displayService.getFactoryInfo());
    }

}
