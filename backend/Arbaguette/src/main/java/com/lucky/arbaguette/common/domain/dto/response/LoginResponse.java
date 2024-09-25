package com.lucky.arbaguette.common.domain.dto.response;

import com.lucky.arbaguette.common.domain.CustomUserDetails;

public record LoginResponse(String accessToken,
                            String refreshToken,
                            String role) {

    public static LoginResponse from(String accessToken, String refreshToken, CustomUserDetails customUserDetails) {
        return new LoginResponse(accessToken, refreshToken, customUserDetails.getRole());
    }
}
