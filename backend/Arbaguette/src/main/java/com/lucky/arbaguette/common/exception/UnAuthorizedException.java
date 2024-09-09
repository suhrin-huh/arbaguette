package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class UnAuthorizedException extends RuntimeException {
    private String message;

    public UnAuthorizedException() {
        this.message = "UnAuthorized Request";
    }

    public UnAuthorizedException(String message) {
        super(message);
        this.message = message;
    }
}
