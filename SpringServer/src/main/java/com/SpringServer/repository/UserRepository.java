package com.SpringServer.repository;

import com.SpringServer.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
}

