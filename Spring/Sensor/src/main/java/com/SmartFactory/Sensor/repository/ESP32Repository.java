package com.SmartFactory.Sensor.repository;

import com.SmartFactory.entity.ESP32Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ESP32Repository extends JpaRepository<ESP32Data, Long> {

}
