package com.SpringServer.repository;


import com.SpringServer.model.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@EnableJpaRepositories
@Repository
public interface ConditionRepository extends JpaRepository<Condition, Timestamp> {
    Condition findFirstByOrderByTimesDesc();

    // 최대 온도 및 습도를 조회하는 메서드
    Condition findFirstByOrderByFactoryTemperatureDesc();
    Condition findFirstByOrderByFactoryHumidityDesc();

    // 최소 온도 및 습도를 조회하는 메서드
    Condition findFirstByOrderByFactoryTemperatureAsc();
    Condition findFirstByOrderByFactoryHumidityAsc();

    // 평균 온습도를 계산하는 메서드
    @Query("SELECT AVG(f.factoryTemperature) FROM Condition f")
    Double getAverageTemperature();

    @Query("SELECT AVG(f.factoryHumidity) FROM Condition f")
    Double getAverageHumidity();

    List<Condition> findByIsValidFalse();
}
