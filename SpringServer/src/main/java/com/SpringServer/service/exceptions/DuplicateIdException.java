package com.SpringServer.service.exceptions;

public class DuplicateIdException extends Throwable {
    public DuplicateIdException(String message) {
        super(message);
    }
}
