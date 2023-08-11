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

    public String saveDefective(DefectiveDTO defectiveDTO) {
        var defective = Defective.builder()
                .defective(defectiveDTO.getDefective())
                .build();
        defectiveRepository.save(defective);
        return "db 저장완료";
    }
}
