package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {

    private String message;

    public NotFoundException() {
        this.message = "NotFound Request";
    }

    public NotFoundException(String message) {
        super(message);
        this.message = message;
    }
}
