package com.SpringServer.service;

import org.springframework.stereotype.Service;

@Service
public class StopService {
    private final int GOAL = 500;

    public double calculateNowGoal(int count){
        double nowGoal = ((double)count / GOAL) * 100;
        return nowGoal;
    }
}
