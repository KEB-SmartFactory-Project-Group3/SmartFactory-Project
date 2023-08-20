package com.SpringServer.service.button;

import com.SpringServer.model.dto.button.ButtonRequest;
import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.repository.OperationStopRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ButtonService {

    private final GoalService goalService;
    private final DBResetService dbResetService;
    private final String MachineURL = "http://192.168.43.142";
    private final String CamURL = "http://192.168.43.9:5000";
    private final OperationStopRepository operationStopRepository;

    public void saveStopReason(ButtonRequest request){
        var stopReason = OperationStop.builder()
                .operationStopTime(request.getOperationStopTime())
                .operationTime(request.getOperationTime())
                .userName(request.getUserName())
                .reason(request.getReason())
                .nowRate(goalService.calculateNowRate(request.getCount()))
                .build();
        operationStopRepository.save(stopReason);
    }

    public StringResultResponse controlMachineState(ButtonRequest request){
        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = null;
        String machineControlUrl = null;
        String message = null;

        switch (request.getState()) {
            case "stop" -> machineControlUrl = MachineURL + "/machineOff";
            case "start" -> machineControlUrl = MachineURL + "/machineOn";
            case "reset" -> {
                machineControlUrl = MachineURL + "/machineReset";
            }
            default -> throw new IllegalArgumentException("Machine command 실패");
        }

        try {
            jsonResponse = restTemplate.getForObject(machineControlUrl, String.class);
            JSONObject jsonObject = new JSONObject(jsonResponse);
            message = jsonObject.getString("message");

            if (message.equals("Machine Reset")){
                dbResetService.resetExceptSpecificTable();
            }
            return StringResultResponse.builder()
                    .result(message)
                    .build();
        } catch (RestClientException e) {
            throw new IllegalArgumentException("Machine Response 에러");
        }
    }

}
