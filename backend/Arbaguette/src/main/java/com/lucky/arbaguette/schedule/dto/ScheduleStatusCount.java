package com.lucky.arbaguette.schedule.dto;

public record ScheduleStatusCount(long normal,
                                  long absent,
                                  long late,
                                  long earlyLeave) {

}
