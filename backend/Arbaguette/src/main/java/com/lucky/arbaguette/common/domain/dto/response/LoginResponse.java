package com.lucky.arbaguette.common.domain.dto.response;

public record LoginResponse(String accessToken,
                            String refreshToken) {
}
