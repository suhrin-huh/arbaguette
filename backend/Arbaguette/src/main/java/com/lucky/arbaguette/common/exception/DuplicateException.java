package com.lucky.arbaguette.common.exception;

import lombok.Getter;

@Getter
public class DuplicateException extends RuntimeException {

    private String message;

    public DuplicateException() {
        this.message = "Duplicate Request";
    }

    public DuplicateException(String message) {
        super(message);
        this.message = message;
    }
}
