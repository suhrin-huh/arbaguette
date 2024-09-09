package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class ForbiddenException extends RuntimeException {
    private String message;

    public ForbiddenException() {
        this.message = "Forbidden Request";
    }

    public ForbiddenException(String message) {
        super(message);
        this.message = message;
    }
}
