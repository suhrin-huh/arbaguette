package com.lucky.arbaguette.schedule.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.dto.CustomUserDetails;
import com.lucky.arbaguette.common.service.CustomerUserDetailService;
import com.lucky.arbaguette.schedule.dto.request.ScheduleSaveRequest;
import com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleCommutesResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleNextResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleSaveResponse;
import com.lucky.arbaguette.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import static java.time.LocalDateTime.now;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final CustomerUserDetailService customerUserDetailService;

    @PostMapping("/crew/commute")
    public ApiResponse<ScheduleSaveResponse> saveCrewCommute(
            @AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody ScheduleSaveRequest request) {
        return ApiResponse.success(scheduleService.saveCrewCommute(customUserDetails, request, now()));
    }

    @GetMapping("/crew/near/commute")
    public ApiResponse<ScheduleNextResponse> getNearCommute(
            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ApiResponse.success(scheduleService.getNextCommute(customUserDetails, now()));
    }

    @GetMapping("/crew/commutes")
    public ApiResponse<ScheduleCommutesResponse> getCommutes(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(required = false) LocalDate targetDate) {
        return ApiResponse.success(
                scheduleService.getCommutes(customUserDetails, targetDate)
        );
    }

    @GetMapping
    public ApiResponse<MonthlyScheduleResponse> getMonthlySchedules(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam int month, @RequestParam int companyId) {
        return ApiResponse.success(scheduleService.getMonthlySchedules(customUserDetails, month, companyId));
    }

}
