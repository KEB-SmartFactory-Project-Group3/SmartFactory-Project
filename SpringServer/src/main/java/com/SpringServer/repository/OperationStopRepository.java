package com.SpringServer.repository;

import com.SpringServer.model.entity.OperationStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@EnableJpaRepositories
@Repository
public interface OperationStopRepository extends JpaRepository<OperationStop, Timestamp> {

}
