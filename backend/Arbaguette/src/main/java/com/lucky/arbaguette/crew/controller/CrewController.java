package com.lucky.arbaguette.crew.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.crew.service.CrewService;
import com.lucky.arbaguette.receipt.domain.dto.response.ReceiptDetailsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crew")
@RequiredArgsConstructor
@Slf4j
public class CrewController {

    private final CrewService crewService;

    @GetMapping("/nusum")
    public ApiResponse<Integer> getNusumSalary(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(crewService.getNusumSalary(customUserDetails));

    }

    @GetMapping("/expected")
    public ApiResponse<Integer> getExpectedSalary(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(crewService.getExpectedSalary(customUserDetails));
    }

    @GetMapping("/receipt")
    public ApiResponse<ReceiptDetailsResponse> getReceipt(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                          @RequestParam int month) {
        return ApiResponse.success(crewService.getReceipt(customUserDetails, month));
    }

}
