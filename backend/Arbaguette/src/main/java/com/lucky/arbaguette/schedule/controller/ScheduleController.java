package com.lucky.arbaguette.schedule.controller;

import static java.time.LocalDateTime.now;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.schedule.dto.request.ScheduleSaveRequest;
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

}
