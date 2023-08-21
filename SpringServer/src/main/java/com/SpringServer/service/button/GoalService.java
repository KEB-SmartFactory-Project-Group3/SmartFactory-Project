package com.SpringServer.service.button;

import com.SpringServer.model.dto.StringResultResponse;
import com.SpringServer.model.dto.data.GoalDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final ProductsRepository productsRepository;

    private int GOAL = 0;

    public Integer saveGoalAmount(GoalDTO goalDTO){
        GOAL = goalDTO.getGoal();
        return GOAL;
    }

    public double calculateNowRate(int count){
        if (GOAL == 0){
            return 0.0;
        }
        double result = ((double)count / GOAL) * 100;
        return Math.round(result * 100.0) / 100.0;
    }

    public boolean is_reachedToGoal(int count){
        return count == GOAL;
    }

    public void reachedGoalAmount() {
        RestTemplate restTemplate = new RestTemplate();
        String machineURL = "http://192.168.43.142/machineOff";
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(machineURL, String.class);
            if (response.getStatusCode() != HttpStatus.OK) {
                throw new IllegalArgumentException("정지 명령 전송에 문제가 발생했습니다." + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("정지 명령 전송 중 오류가 발생했습니다." + e.getMessage());
        }
    }
}
