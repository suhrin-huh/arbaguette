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
                                       long normal,
                                       long absent,
                                       long late,
                                       long earlyLeave,
                                       List<CommuteInfo> commutes) {

    public static ScheduleCommutesResponse from(Crew crew,
                                                LocalDateTime targetDate,
                                                ScheduleStatusCount commuteCounts,
                                                List<Schedule> schedules) {
        return new ScheduleCommutesResponse(
                crew.getCompany().getName(),
                formatYearMonth(targetDate),
                commuteCounts.normal(),
                commuteCounts.absent(),
                commuteCounts.late(),
                commuteCounts.earlyLeave(),
                schedules.stream()
                        .map(schedule -> new CommuteInfo(
                                formatMonthDay(schedule.getStartTime()),
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
