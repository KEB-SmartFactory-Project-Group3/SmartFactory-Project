package com.SpringServer.controller.button;


import com.SpringServer.model.dto.button.ButtonRequest;
import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.dto.data.GoalDTO;
import com.SpringServer.service.button.ButtonService;
import com.SpringServer.service.button.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/click")
public class ButtonController {


    private final ButtonService buttonService;

    private final GoalService goalService;

    @PostMapping("/stopbutton")
    public ResponseEntity<StringResultResponse> stopMachine(@RequestBody ButtonRequest request){
        buttonService.saveStopReason(request);
        return  ResponseEntity.ok(buttonService.controlMachineState(request));
    }

    @PostMapping("/button")
    public ResponseEntity<StringResultResponse> controlMachine(@RequestBody ButtonRequest request){
        return  ResponseEntity.ok(buttonService.controlMachineState(request));
    }

    @PostMapping("/setgoal")
    public ResponseEntity<Integer> saveGoalAmount(@RequestBody GoalDTO goalDTO){
        return ResponseEntity.ok(goalService.saveGoalAmount(goalDTO));
    }
}
