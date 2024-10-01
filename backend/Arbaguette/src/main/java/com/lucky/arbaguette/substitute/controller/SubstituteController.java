package com.lucky.arbaguette.substitute.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.substitute.dto.request.SubstituteRequest;
import com.lucky.arbaguette.substitute.dto.response.SubstituteAgreeResponse;
import com.lucky.arbaguette.substitute.dto.response.SubstituteSaveResponse;
import com.lucky.arbaguette.substitute.dto.response.SubstitutesResponse;
import com.lucky.arbaguette.substitute.service.SubstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/substitute")
public class SubstituteController {

    private final SubstituteService substituteService;

    @PostMapping
    public ApiResponse<SubstituteSaveResponse> saveSubstitute(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody SubstituteRequest request) {
        return ApiResponse.success(substituteService.saveSubstitute(customUserDetails, request));
    }

    @GetMapping
    public ApiResponse<SubstitutesResponse> getSubstitutes(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(required = false, defaultValue = "0") int companyId) {
        return ApiResponse.success(substituteService.getSubstitutes(customUserDetails, companyId));
    }

    @PutMapping("/agree")
    public ApiResponse<SubstituteAgreeResponse> agreeSubstitute(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody SubstituteRequest request) {
        return ApiResponse.success(substituteService.agreeSubstitute(customUserDetails, request));
    }
}
