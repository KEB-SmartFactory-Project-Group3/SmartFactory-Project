package com.SpringServer.repository;


import com.SpringServer.model.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface ProductsRepository extends JpaRepository<Products, String> {
    Products findFirstByOrderByCountDesc();
}
