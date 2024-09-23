package com.lucky.arbaguette.boss.controller;

import com.lucky.arbaguette.boss.dto.CrewSaveRequest;
import com.lucky.arbaguette.boss.service.BossService;
import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.crew.domain.dto.response.CrewListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.checkerframework.checker.units.qual.A;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boss")
@RequiredArgsConstructor
@Slf4j
public class BossController {

    private final BossService bossService;

    @GetMapping("/crews") // 알바생 전체 목록 조회
    public ApiResponse<CrewListResponse> getCrews(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam("companyId") int companyId) {
        return ApiResponse.success(bossService.getCrews(customUserDetails, companyId));
    }

    @PostMapping("/crew")
    public ApiResponse<Void> saveCrew(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody CrewSaveRequest crewSaveRequest) {
        bossService.saveCrew(customUserDetails, crewSaveRequest);
        return ApiResponse.success();
    }

}
