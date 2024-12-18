package com.lucky.arbaguette.company.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.company.dto.CompanyInfo;
import com.lucky.arbaguette.company.dto.CompanyListResponse;
import com.lucky.arbaguette.company.service.CompanyService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping(value = "/ocr", consumes = "multipart/form-data")
    public ApiResponse<CompanyInfo> ocrImage(@RequestPart("image") MultipartFile file) throws IOException {
        return ApiResponse.success(companyService.ocrImage(file));
    }

    @PostMapping()
    public ApiResponse<Void> companySave(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                         @RequestBody CompanyInfo companyInfo) {
        companyService.companySave(customUserDetails, companyInfo);
        return ApiResponse.success();
    }

    @GetMapping
    public ApiResponse<CompanyListResponse> getCompanies(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(companyService.getCompanies(customUserDetails));
    }

}
