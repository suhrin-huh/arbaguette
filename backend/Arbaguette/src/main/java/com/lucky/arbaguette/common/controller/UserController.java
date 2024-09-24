package com.lucky.arbaguette.common.controller;


import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.UserJoinRequest;
import com.lucky.arbaguette.common.domain.dto.response.LoginTokenResponse;
import com.lucky.arbaguette.common.domain.dto.response.UserInfoResponse;
import com.lucky.arbaguette.common.service.UserService;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse<Void> checkEmail(@RequestParam String email) {
        userService.checkEmail(email);
        return ApiResponse.success();
    }

    @PostMapping
    public ApiResponse<Void> joinProcess(@RequestBody UserJoinRequest joinRequest) {
        userService.joinProcess(joinRequest);
        return ApiResponse.success();
    }

    @PostMapping("/info")
    public ApiResponse<UserInfoResponse> info(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(userService.info(customUserDetails));
    }

    @PostMapping("/reissue")
    public ApiResponse<LoginTokenResponse> reissue(@RequestBody @NotEmpty String refreshToken) {
        return ApiResponse.success(userService.reissue(refreshToken));
    }
}
