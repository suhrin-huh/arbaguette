package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class InternetServerErrorException extends RuntimeException {
    private String message;

    public InternetServerErrorException() {
        this.message = "InternetServerError Request";
    }

    public InternetServerErrorException(String message) {
        super(message);
        this.message = message;
    }
}
