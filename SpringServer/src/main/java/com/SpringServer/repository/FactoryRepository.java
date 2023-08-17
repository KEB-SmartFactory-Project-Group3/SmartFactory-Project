package com.SpringServer.repository;


import com.SpringServer.model.entity.FactoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@EnableJpaRepositories
@Repository
public interface FactoryRepository extends JpaRepository<FactoryInfo, Timestamp> {
    FactoryInfo findFirstByOrderByTimesDesc();

    // 최대 온도 및 습도를 조회하는 메서드
    FactoryInfo findFirstByOrderByFactoryTemperatureDesc();
    FactoryInfo findFirstByOrderByFactoryHumidityDesc();

    // 최소 온도 및 습도를 조회하는 메서드
    FactoryInfo findFirstByOrderByFactoryTemperatureAsc();
    FactoryInfo findFirstByOrderByFactoryHumidityAsc();

    @Query("SELECT AVG(f.factoryTemperature) FROM FactoryInfo f WHERE f.times BETWEEN :startTimestamp AND :endTimestamp")
    Double getAverageTemperatureBetweenDates(@Param("startTimestamp") Timestamp startTimestamp, @Param("endTimestamp") Timestamp endTimestamp);

    @Query("SELECT AVG(f.factoryHumidity) FROM FactoryInfo f WHERE f.times BETWEEN :startTimestamp AND :endTimestamp")
    Double getAverageHumidityBetweenDates(@Param("startTimestamp") Timestamp startTimestamp, @Param("endTimestamp") Timestamp endTimestamp);

}
