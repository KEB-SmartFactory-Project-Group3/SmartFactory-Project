package com.SpringServer.service;

import com.SpringServer.model.dto.FactoryInfoDTO;
import com.SpringServer.model.dto.CountDTO;
import com.SpringServer.model.entity.FactoryInfo;
import com.SpringServer.model.entity.Products;
import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.repository.OperationStopRepository;
import com.SpringServer.repository.ProductsRepository;
import com.SpringServer.repository.FactoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DisplayService {

    private final FactoryRepository factoryRepository;
    private final ProductsRepository productsRepository;
    private final OperationStopRepository operationStopRepository;

    private final GoalService goalService;


    public CountDTO getProductsCount(){
        Products latestRecode = productsRepository.findFirstByOrderByCountDesc();
        if (latestRecode != null){
            int latestCount = latestRecode.getCount();
            return CountDTO.builder()
                    .nowRate(goalService.calculateNowRate(latestCount))
                    .count(latestCount)
                    .defectiveCount(latestRecode.getDefectiveCount())
                    .build();
        }
        return CountDTO.builder()
                .nowRate(0.0)
                .count(0)
                .defectiveCount(0)
                .build();
    }

    public FactoryInfoDTO getFactoryInfo(){
        FactoryInfo latestRecode = factoryRepository.findFirstByOrderByTimesDesc();
        if (latestRecode != null){
            double latestTemperature = latestRecode.getFactoryTemperature();
            int latestHumidity = latestRecode.getFactoryHumidity();
            return FactoryInfoDTO.builder()
                    .factoryTemperature(latestTemperature)
                    .factoryHumidity(latestHumidity)
                    .build();
        }
        return FactoryInfoDTO.builder()
                .factoryTemperature(0.0)
                .factoryHumidity(0)
                .build();
    }

    public List<OperationStop> findAllOperationStop() {
        return operationStopRepository.findAll();
    }

}
