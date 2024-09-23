package com.lucky.arbaguette.schedule.domain;

import lombok.Getter;

@Getter
public enum StatusType {

    YES("정상 출근"),
    LATE("지각"),
    NO("결근");

    private String message;

    StatusType(String message) {
        this.message = message;
    }

}
