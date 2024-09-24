package com.lucky.arbaguette.common.domain.dto.response;

public record LoginTokenResponse(String accessToken,
                                 String refreshToken) {

    public static LoginTokenResponse of(String accessToken, String refreshToken) {
        return new LoginTokenResponse(accessToken, refreshToken);
    }
}
