package com.SpringServer.repository;


import com.SpringServer.model.entity.FactoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface FactoryInfoRepository extends JpaRepository<FactoryInfo, Timestamp> {
    FactoryInfo findFirstByOrderByTimesDesc();

    // 최대 온도 및 습도를 조회하는 메서드
    FactoryInfo findFirstByOrderByFactoryTemperatureDesc();
    FactoryInfo findFirstByOrderByFactoryHumidityDesc();

    // 최소 온도 및 습도를 조회하는 메서드
    FactoryInfo findFirstByOrderByFactoryTemperatureAsc();
    FactoryInfo findFirstByOrderByFactoryHumidityAsc();

    // 평균 온습도를 계산하는 메서드
    @Query("SELECT AVG(f.factoryTemperature) FROM FactoryInfo f")
    Double getAverageTemperature();

    @Query("SELECT AVG(f.factoryHumidity) FROM FactoryInfo f")
    Double getAverageHumidity();

    List<FactoryInfo> findByIsValidFalse();
}
