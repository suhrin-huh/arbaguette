package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class BadRequestException extends RuntimeException {

    private String message;

    public BadRequestException() {
        this.message = "Bad Request";
    }

    public BadRequestException(String message) {
        super(message);
        this.message = message;
    }
}
