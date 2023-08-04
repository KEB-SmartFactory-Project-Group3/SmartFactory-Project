package com.SpringServer.repository;

//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.entity.ESP32Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ESP32Repository extends JpaRepository<ESP32Data, Long> {

    ESP32Data findFirstByOrderByTimesAsc();

    ESP32Data findFirstByOrderByTimesDesc();

}
