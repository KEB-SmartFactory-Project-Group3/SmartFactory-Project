package com.SpringServer.service.data;

import com.SpringServer.model.dto.StringResultResponse;
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
    private final GoalService goalService;

    public StringResultResponse saveProducts(Products products) {
        var product = Products.builder()
                .serialNumber(products.getSerialNumber())
                .count(products.getCount())
                .productionTime(products.getProductionTime())
                .defectiveCount(products.getDefectiveCount())
                .state(products.getState())
                .build();
        try{
            productsRepository.save(product);
            return StringResultResponse.builder()
                .result("products 저장이 완료되었습니다.")
                .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("products 저장에 실패했습니다.");
        }
    }


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
