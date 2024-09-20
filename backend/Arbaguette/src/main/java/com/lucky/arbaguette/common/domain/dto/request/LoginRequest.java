package com.lucky.arbaguette.common.domain.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(@NotEmpty String email,
                           @NotEmpty String password) {
}
