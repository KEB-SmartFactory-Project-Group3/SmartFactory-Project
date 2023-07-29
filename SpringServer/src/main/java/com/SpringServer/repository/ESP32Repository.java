package com.SpringServer.repository;

import com.SpringServer.model.dto.ESP32Data;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ESP32Repository extends JpaRepository<ESP32Data, Long> {
}
