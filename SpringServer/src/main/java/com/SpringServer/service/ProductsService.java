package com.SpringServer.service;

import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.model.entity.Products;
import com.SpringServer.repository.ProductsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductsService {

    private final ProductsRepository productsRepository;

    public String saveProducts(Products products) {
        var product = Products.builder()
                .serialNumber(products.getSerialNumber())
                .count(products.getCount())
                .productionTime(products.getProductionTime())
                .defectiveCount(products.getDefectiveCount())
                .state(products.getState())
                .build();
        productsRepository.save(product);
        return "db 저장완료";
    }

    public List<Products> findAllProducts(){
        return productsRepository.findAll();
    }

}
