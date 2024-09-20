package com.lucky.arbaguette.schedule.dto.response;

import java.time.LocalDateTime;

public record ScheduleSaveResponse(String workStatus,
                                   LocalDateTime time) {

    public static ScheduleSaveResponse from(String workStatus, LocalDateTime time) {
        return new ScheduleSaveResponse(workStatus, time);
    }
}
