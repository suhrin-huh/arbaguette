package com.lucky.arbaguette.contract.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.contract.domain.dto.ContractSaveRequest;
import com.lucky.arbaguette.contract.service.ContractService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contract")
public class ContractController {

    private final ContractService contractService;

    @PostMapping(value = "/boss", consumes = "multipart/form-data")
    public ApiResponse<Void> saveContract(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                          @RequestPart("body") ContractSaveRequest contractSaveRequest,
                                          @RequestPart("image") MultipartFile file) throws IOException {
        contractService.saveContract(customUserDetails, contractSaveRequest, file);
        return ApiResponse.success();
    }

    @PostMapping(value = "/crew", consumes = "multipart/form-data")
    public ApiResponse<Void> signCrewContract(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                              @RequestPart("image") MultipartFile file) throws IOException {
        contractService.signCrewContract(customUserDetails, file);
        return ApiResponse.success();
    }

}
