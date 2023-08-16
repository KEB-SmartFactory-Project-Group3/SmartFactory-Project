package com.SpringServer.repository;


import com.SpringServer.model.entity.Defective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface DefectiveRepository extends JpaRepository<Defective, String> {
}
