package com.lucky.arbaguette.schedule.controller;

import static java.time.LocalDateTime.now;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.service.CustomerUserDetailService;
import com.lucky.arbaguette.schedule.dto.request.ScheduleSaveRequest;
import com.lucky.arbaguette.schedule.dto.response.DailyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.MonthlyScheduleResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleCommutesResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleNextResponse;
import com.lucky.arbaguette.schedule.dto.response.ScheduleSaveResponse;
import com.lucky.arbaguette.schedule.service.ScheduleService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/crew")
    public ApiResponse<Void> saveSchedule(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        scheduleService.saveSchedule(customUserDetails);
        return ApiResponse.success();
    }

    @GetMapping
    public ApiResponse<MonthlyScheduleResponse> getMonthlySchedules(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam int month,
            @RequestParam(required = false, defaultValue = "0") int companyId) {
        return ApiResponse.success(scheduleService.getMonthlySchedules(customUserDetails, month, companyId));
    }

    @GetMapping("/day")
    public ApiResponse<DailyScheduleResponse> getDaySchedules(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestParam(required = false, defaultValue = "0") int companyId,
            @RequestParam LocalDate date) {
        return ApiResponse.success(scheduleService.getDaySchedules(customUserDetails, companyId, date));
    }

}
