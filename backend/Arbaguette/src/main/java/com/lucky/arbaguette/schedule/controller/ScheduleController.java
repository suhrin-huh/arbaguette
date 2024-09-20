package com.lucky.arbaguette.schedule.controller;

import static java.time.LocalDateTime.now;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.schedule.dto.response.ScheduleSaveResponse;
import com.lucky.arbaguette.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/crew/in")
    public ApiResponse<ScheduleSaveResponse> updateInWork(
            @AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam("companyId") int companyId) {
        return ApiResponse.success(scheduleService.updateInWork(customUserDetails, companyId, now()));
    }

    @PostMapping("/crew/out")
    public ApiResponse<ScheduleSaveResponse> updateOutWork(
            @AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam int companyId) {
        return ApiResponse.success(scheduleService.updateOutWork(customUserDetails, companyId, now()));
    }
}
