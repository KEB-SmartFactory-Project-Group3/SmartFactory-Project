package com.start.first.repository;

import com.start.first.entity.Products;
import com.start.first.entity.ProductsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, ProductsId> {
}
