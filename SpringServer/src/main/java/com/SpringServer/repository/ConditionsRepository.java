package com.SpringServer.repository;


import com.SpringServer.model.entity.Conditions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface ConditionsRepository extends JpaRepository<Conditions, Timestamp> {
    Conditions findFirstByOrderByTimesDesc();

    // 최대 온도 및 습도를 조회하는 메서드
    Conditions findFirstByOrderByFactoryTemperatureDesc();
    Conditions findFirstByOrderByFactoryHumidityDesc();

    // 최소 온도 및 습도를 조회하는 메서드
    Conditions findFirstByOrderByFactoryTemperatureAsc();
    Conditions findFirstByOrderByFactoryHumidityAsc();

    // 평균 온습도를 계산하는 메서드
    @Query("SELECT AVG(f.factoryTemperature) FROM Conditions f")
    Double getAverageTemperature();

    @Query("SELECT AVG(f.factoryHumidity) FROM Conditions f")
    Double getAverageHumidity();

    List<Conditions> findByIsValidFalse();
}
