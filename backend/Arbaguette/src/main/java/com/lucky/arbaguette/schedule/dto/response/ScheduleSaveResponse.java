package com.lucky.arbaguette.schedule.dto.response;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public record ScheduleSaveResponse(String workStatus,
                                   String time) {

    public static ScheduleSaveResponse from(String workStatus, LocalDateTime time) {
        return new ScheduleSaveResponse(workStatus, time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
    }
}
