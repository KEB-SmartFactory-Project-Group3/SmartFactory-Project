package com.SpringServer.repository;

//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.entity.ESP32Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ESP32Repository extends JpaRepository<ESP32Data, Long> {

    ESP32Data findFirstByOrderByTimesDesc();

}
