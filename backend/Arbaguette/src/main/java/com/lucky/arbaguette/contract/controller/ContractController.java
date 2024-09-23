package com.lucky.arbaguette.contract.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.contract.domain.dto.ContractSaveRequest;
import com.lucky.arbaguette.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contract")
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/boss")
    public ApiResponse<Void> saveContract(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody ContractSaveRequest contractSaveRequest) {
        contractService.saveContract(customUserDetails, contractSaveRequest);
        return ApiResponse.success();
    }
}
