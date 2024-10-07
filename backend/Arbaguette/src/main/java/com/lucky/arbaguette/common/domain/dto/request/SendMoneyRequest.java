package com.lucky.arbaguette.common.domain.dto.request;

public record SendMoneyRequest(String account,
                               String money,
                               String password) {
}
