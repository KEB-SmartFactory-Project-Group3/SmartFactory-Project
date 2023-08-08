package com.SpringServer.service;

import com.SpringServer.model.dto.MachineInfoDTO;
import com.SpringServer.model.entity.Products;
import com.SpringServer.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    private ProductsRepository productsRepository;

    public MachineInfoDTO fetchMachineInfo(String machineNumber){
        Products firstProduct = productsRepository.findFirstByMachineNumberOrderByTimesAsc(machineNumber);
        Products latestProduct = productsRepository.findFirstByMachineNumberOrderByTimesDesc(machineNumber);
        return MachineInfoDTO.builder()
                .machineNumber(latestProduct.getMachineNumber())    // latestProduct machineNumber
                .timestamp(firstProduct.getTimes())                 // firstProduct times
                .temperature(latestProduct.getTemperature())        // latestProduct temperature
                .count(latestProduct.getCount())                    // latestProduct count
                .build();
    }



//    public TimesDTO getOperationTime(){
//        Products firstRecord = productsRepository.findFirstByOrderByTimesAsc();
//
//        if (firstRecord != null) {
//            Timestamp firstTime = firstRecord.getTimes();
//            Timestamp now = new Timestamp(System.currentTimeMillis());
//            long duration = now.getTime() - firstTime.getTime();
//
//            long totalSeconds = duration / 1000;
//            long hours = totalSeconds / 3600;
//            long minutes = (totalSeconds % 3600) / 60;
//            long seconds = totalSeconds % 60;
//
//            String formattedDuration = String.format("%02d시간 %02d분 %02d초", hours, minutes, seconds);
//
//            return TimesDTO.builder()
//                    .operationTime(formattedDuration)
//                    .build();
//        }
//        return TimesDTO.builder()
//                .operationTime(String.format("%02d시간 %02d분 %02d초", 0, 0, 0))
//                .build();
//    }
//
//    public CountDTO getCount(){
//        Products latestRecode = productsRepository.findFirstByOrderByTimesDesc();
//
//        if (latestRecode != null) {
//            int latestCount = latestRecode.getCount();
//            return CountDTO.builder()
//                    .count(latestCount)
//                    .build();
//        }
//        return CountDTO.builder()
//                .count(0)
//                .build();
//    }
}
