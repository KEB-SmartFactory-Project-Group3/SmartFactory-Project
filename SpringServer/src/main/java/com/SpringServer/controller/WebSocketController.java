package com.SpringServer.controller;

import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;

@EnableScheduling
@Controller
public class WebSocketController {

    @Autowired
    private WebSocketService webSocketService;

    @Autowired
    private SimpMessagingTemplate template;

    // 각 머신의 상태를 AtomicBoolean으로 저장하는 HashMap
    private final Map<String, AtomicBoolean> sendMachinesInfo = new HashMap<>();

    // 비동기 처리를 위한 ExecutorService 생성
    private final ExecutorService executorService;

    public WebSocketController() {
        // 모든 머신의 초기 상태를 true로 설정
        sendMachinesInfo.put("Machine A", new AtomicBoolean(true));
        sendMachinesInfo.put("Machine B", new AtomicBoolean(true));
        sendMachinesInfo.put("Machine C", new AtomicBoolean(true));

        // 스레드 풀 크기를 머신의 개수로 설정하고 ExecutorService 인스턴스 생성
        executorService = Executors.newFixedThreadPool(sendMachinesInfo.size());
    }

    @Scheduled(fixedRate = 1000)
    public void sendMachineInfo() {
        for (Map.Entry<String, AtomicBoolean> entry : sendMachinesInfo.entrySet()) {
            String machineNumber = entry.getKey();
            AtomicBoolean shouldSend = entry.getValue();

            // 머신 별로 상태를 확인하고 전송합니다.
            if (shouldSend.get()) {
                executorService.submit(() -> {
                    MachineInfoDTO machineInfoDTO = webSocketService.fetchMachineInfo(machineNumber);
                    template.convertAndSend("/topic/machines_info/" + machineNumber, machineInfoDTO);
                });
            }
        }
    }

    // 해당 머신의 전송 상태를 변경하는 메서드
    public void setSendMachineInfo(String machineNumber, boolean shouldSend) {
        AtomicBoolean sendStatus = sendMachinesInfo.get(machineNumber);
        if (sendStatus != null) {
            sendStatus.set(shouldSend);
        }
    }
}
