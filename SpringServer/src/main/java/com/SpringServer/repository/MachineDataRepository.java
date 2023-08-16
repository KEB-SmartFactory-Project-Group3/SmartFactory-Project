package com.SpringServer.repository;

//import com.SpringServer.model.dto.TimesDTO;
import com.SpringServer.model.entity.MachineData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@EnableJpaRepositories
@Repository
public interface MachineDataRepository extends JpaRepository<MachineData, Timestamp> {

    MachineData findFirstByOrderByTimesDesc();

}
