package com.SpringServer.repository;

import com.SpringServer.model.entity.ESP32Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ESP32Repository extends JpaRepository<ESP32Data, Long> {

    @Query("SELECT e FROM ESP32Data e ORDER BY e.times ASC")
    List<ESP32Data> findAllByOrderByTimesAsc();

    default ESP32Data findFirstRecord() {
        List<ESP32Data> records = findAllByOrderByTimesAsc();
        return records.isEmpty() ? null : records.get(0);
    }
}
