package com.lucky.arbaguette.schedule.dto.response;

import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.domain.StatusType;

import java.time.LocalDateTime;
import java.util.List;

public record DailyScheduleResponse(int totalCount,
                                    int normalCount,
                                    int absentCount,
                                    int yetCount,
                                    List<CrewScheduleInfo> crewScheduleInfos) {

    public static DailyScheduleResponse from(int totalCount,
                                             int normalCount,
                                             int absentCount,
                                             int yetCount,
                                             List<CrewScheduleInfo> crewScheduleInfos) {
        return new DailyScheduleResponse(
                totalCount,
                normalCount, absentCount,
                yetCount,
                crewScheduleInfos);
    }

    public record CrewScheduleInfo(String name,
                                   String profileImage,
                                   String tel,
                                   LocalDateTime startTime,
                                   LocalDateTime endTime,
                                   StatusType status
    ) {
        public static CrewScheduleInfo from(Schedule schedule) {
            return new CrewScheduleInfo(
                    schedule.getCrew().getName(),
                    schedule.getCrew().getProfileImage(),
                    schedule.getCrew().getTel(),
                    schedule.getStartTime(),
                    schedule.getEndTime(),
                    schedule.getStatus());
        }

    }
}


