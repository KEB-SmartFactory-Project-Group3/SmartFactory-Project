package com.SpringServer.repository;

import com.SpringServer.model.entity.StopReason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;


@EnableJpaRepositories
@Repository
public interface StopRepository extends JpaRepository<StopReason, Timestamp> {

}
