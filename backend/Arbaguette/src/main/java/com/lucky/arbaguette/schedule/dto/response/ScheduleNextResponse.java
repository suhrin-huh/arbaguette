package com.lucky.arbaguette.schedule.dto.response;

import static com.lucky.arbaguette.common.util.DateFormatUtil.formatDateTime;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;

public record ScheduleNextResponse(String companyName,
                                   String startTime,
                                   String endTime) {

    public static ScheduleNextResponse from(Schedule schedule, Crew crew) {
        return new ScheduleNextResponse(
                crew.getCompany().getName(),
                formatDateTime(schedule.getStartTime()),
                formatDateTime(schedule.getEndTime())
        );
    }
}
