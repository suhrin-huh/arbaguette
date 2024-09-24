package com.lucky.arbaguette.schedule.domain;

import lombok.Getter;

@Getter
public enum StatusType {

    NORMAL("출근"),
    LATE("지각"),
    ABSENT("결근"),
    EARLY("조퇴");

    private String message;

    StatusType(String message) {
        this.message = message;
    }

}
