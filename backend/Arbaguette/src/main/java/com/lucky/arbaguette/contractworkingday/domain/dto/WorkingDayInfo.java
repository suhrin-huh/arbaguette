package com.lucky.arbaguette.contractworkingday.domain.dto;

import com.lucky.arbaguette.contractworkingday.domain.ContractWorkingDay;

import java.time.LocalTime;

public record WorkingDayInfo(int weekday,
                             LocalTime startTime,
                             LocalTime endTime) {

    public static WorkingDayInfo to(ContractWorkingDay workingDay) {
        return new WorkingDayInfo(workingDay.getId().getWeekday(),
                workingDay.getStartTime(),
                workingDay.getEndTime());

    }

}
