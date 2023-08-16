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

    private final GoalService goalService;
    private final DisplayService displayService;
    private final ButtonService buttonService;



    @GetMapping("/machineinfo")
    public ResponseEntity<MachineInfoDTO> displayMachineInfo(){
        return ResponseEntity.ok(displayService.getMachineInfo());
    }

    @GetMapping("/factoryinfo")
    public ResponseEntity<FactoryInfoDTO> displayFactoryInfo(){
        return ResponseEntity.ok(displayService.getFactoryInfo());
    }

    @PostMapping("/goal")
    public ResponseEntity<Integer> saveGoalAmount(@RequestBody GoalDTO goalDTO){
        return ResponseEntity.ok(goalService.saveGoalAmount(goalDTO));
    }

    @PostMapping("/button")
    public ResponseEntity<ButtonResponse> controlEsp32Board(@RequestBody ButtonRequest request){
        return  ResponseEntity.ok(buttonService.saveStopReason(request));
    }

}
