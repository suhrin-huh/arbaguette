package com.lucky.arbaguette.common.controller;


import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.UserJoinRequest;
import com.lucky.arbaguette.common.domain.dto.request.UserReissueRequest;
import com.lucky.arbaguette.common.domain.dto.response.LoginTokenResponse;
import com.lucky.arbaguette.common.domain.dto.response.UserInfoResponse;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public ApiResponse<LoginTokenResponse> reissue(@RequestBody UserReissueRequest request) {
        return ApiResponse.success(userService.reissue(request.refreshToken()));
    }

    @GetMapping("/checkPassword")
    public ApiResponse<Void> checkAccountPassword(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam String accountPassword) {
        if (userService.checkAccountPassword(customUserDetails, accountPassword)) {
            return ApiResponse.success();
        }
        throw new BadRequestException("비밀번호가 틀립니다.");
    }
}
