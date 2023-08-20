package com.SpringServer.service.data;

import com.SpringServer.model.dto.data.CurrentProductsDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.repository.ProductsRepository;
import com.SpringServer.service.button.GoalService;
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

    private final GoalService goalService;


    public CurrentProductsDTO getProductsCount(){
        Products latestRecode = productsRepository.findFirstByOrderByCountDesc();
        if (latestRecode != null){
            int latestCount = latestRecode.getCount();
            return CurrentProductsDTO.builder()
                    .nowRate(goalService.calculateNowRate(latestCount))
                    .count(latestCount)
                    .defectiveCount(latestRecode.getDefectiveCount())
                    .build();
        }
        return CurrentProductsDTO.builder()
                .nowRate(0.0)
                .count(0)
                .defectiveCount(0)
                .build();
    }

    public List<Products> findAllProducts(){
        return productsRepository.findAll();
    }

}
