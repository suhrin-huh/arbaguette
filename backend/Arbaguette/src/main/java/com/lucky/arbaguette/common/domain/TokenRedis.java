package com.lucky.arbaguette.common.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TokenRedis {

    private String email;
    private String refreshToken;

    @Builder
    private TokenRedis(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }
}
