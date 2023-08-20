package com.SpringServer.controller;

import com.SpringServer.model.dto.ErrorResponse;
import com.SpringServer.service.exceptions.DuplicateIdException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandlerController {

    @ExceptionHandler(DuplicateIdException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateIdException(DuplicateIdException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
