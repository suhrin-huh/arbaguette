package com.lucky.arbaguette.common.domain.dto;

import lombok.Builder;

@Builder
public record CommonUserInfo(String email,
                             String password,
                             String role) {
}
