package com.SpringServer.service.data;

import com.SpringServer.model.entity.OperationStop;
import com.SpringServer.repository.OperationStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperationStopService {

    private final OperationStopRepository operationStopRepository;

    public List<OperationStop> findAllOperationStop() {
        return operationStopRepository.findAll();
    }
}
