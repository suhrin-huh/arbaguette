package com.lucky.arbaguette.schedule.dto.response;

import static com.lucky.arbaguette.common.util.DateFormatUtil.formatMonthDay;
import static com.lucky.arbaguette.common.util.DateFormatUtil.formatTime;
import static com.lucky.arbaguette.common.util.DateFormatUtil.formatYearMonth;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.domain.StatusType;
import com.lucky.arbaguette.schedule.dto.ScheduleStatusCount;
import java.time.LocalDateTime;
import java.util.List;

public record ScheduleCommutesResponse(String companyName,
                                       String targetDate,
                                       List<ScheduleStatusCount> commuteCounts,
                                       List<CommuteInfo> commutes) {

    public static ScheduleCommutesResponse from(Crew crew,
                                                LocalDateTime targetDate,
                                                List<ScheduleStatusCount> commuteCounts,
                                                List<Schedule> schedules) {
        return new ScheduleCommutesResponse(
                crew.getCompany().getName(),
                formatYearMonth(targetDate),
                commuteCounts,
                schedules.stream()
                        .map(schedule -> new CommuteInfo(
                                formatMonthDay(schedule.getInTime()),
                                formatTime(schedule.getInTime()),
                                formatTime(schedule.getOutTime()),
                                schedule.getStatus()
                        ))
                        .toList()
        );
    }

    public record CommuteInfo(String date,
                              String inTime,
                              String outTime,
                              StatusType commuteStatus) {

    }


}
