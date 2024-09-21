package com.lucky.arbaguette.common.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.request.SendMoneyRequest;
import com.lucky.arbaguette.common.domain.dto.response.AccountResponse;
import com.lucky.arbaguette.common.service.BankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bank")
@RequiredArgsConstructor
@Slf4j
public class BankController {

    private final BankService bankService;

    @GetMapping("/account")
    public ApiResponse<AccountResponse> getAccount(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(bankService.getAccount(customUserDetails));
    }

    @PostMapping("/remittance")
    public ApiResponse<Void> sendMoney(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody SendMoneyRequest request) {
        bankService.sendMoney(customUserDetails, request);
        return ApiResponse.success();
    }

    @GetMapping("/history")
    public ApiResponse<Map<String, Object>> getHistory(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(bankService.getHistory(customUserDetails));
    }
}