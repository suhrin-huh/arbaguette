package com.lucky.arbaguette.contract.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.contract.domain.dto.ContractSaveRequest;
import com.lucky.arbaguette.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contract")
public class ContractController {

    private final ContractService contractService;

    @PostMapping(value = "/boss", consumes = "multipart/form-data")
    public ApiResponse<Void> saveContract(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestPart("body") ContractSaveRequest contractSaveRequest, @RequestPart("image") MultipartFile file) throws IOException {
        contractService.saveContract(customUserDetails, contractSaveRequest, file);
        return ApiResponse.success();
    }

    @PostMapping(value = "/crew", consumes = "multipart/form-data")
    public ApiResponse<Void> signCrewContract(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestPart("image") MultipartFile file) throws IOException {
        contractService.signCrewContract(customUserDetails, file);
        return ApiResponse.success();
    }

}
