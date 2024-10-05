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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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

    @PostMapping(consumes = "multipart/form-data")
    public ApiResponse<Void> joinProcess(@RequestPart("body") UserJoinRequest joinRequest, @RequestPart("image") MultipartFile file) throws IOException {
        userService.joinProcess(joinRequest, file);
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
