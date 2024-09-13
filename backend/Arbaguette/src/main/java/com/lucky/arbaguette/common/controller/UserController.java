package com.lucky.arbaguette.common.controller;


import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.UserJoinRequest;
import com.lucky.arbaguette.common.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @PostMapping("")
    public ApiResponse<Void> joinProcess(@RequestBody UserJoinRequest joinRequest) {
        userService.joinProcess(joinRequest);
        return ApiResponse.success();
    }

    @PostMapping("/info")
    public ApiResponse<Void> info(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        log.info("userEmail: {}", customUserDetails.getUsername());
        log.info("userRole: {}", customUserDetails.getRole());
        return ApiResponse.success();
    }
}
