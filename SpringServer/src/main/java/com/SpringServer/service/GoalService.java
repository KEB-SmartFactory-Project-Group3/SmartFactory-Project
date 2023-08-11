package com.SpringServer.service;

import com.SpringServer.model.dto.GoalDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoalService {

    public int GOAL = 0;

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
}
