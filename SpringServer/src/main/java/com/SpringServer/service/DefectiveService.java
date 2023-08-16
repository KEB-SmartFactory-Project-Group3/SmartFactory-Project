package com.SpringServer.service;

import com.SpringServer.model.dto.DefectiveDTO;
import com.SpringServer.model.entity.Defective;
import com.SpringServer.repository.DefectiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DefectiveService {

    private final DefectiveRepository defectiveRepository;

    public String saveDefective(Defective defective) {
        var defectiveness = Defective.builder()
                .serialNumber(defective.getSerialNumber())
                .count(defective.getCount())
                .defectiveCount(defective.getDefectiveCount())
                .state(defective.getState())
                .build();
        defectiveRepository.save(defectiveness);
        return "db 저장완료";
    }


}
