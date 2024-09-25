package com.lucky.arbaguette.schedule.dto.response;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.domain.StatusType;

import java.time.LocalDateTime;
import java.util.List;

public record DayScheduleResponse(int totalCount,
                                  int normalCount,
                                  int absentCount,
                                  int yetCount,
                                  List<CrewDayScheduleInfo> crewDayScheduleInfos) {

    public DayScheduleResponse from(int totalCount,
                                    int normalCount,
                                    int absentCount,
                                    int yetCount,
                                    List<CrewDayScheduleInfo> crewDayScheduleInfos) {
        return new DayScheduleResponse(totalCount, normalCount, absentCount, yetCount, crewDayScheduleInfos);
    }

    public record CrewDayScheduleInfo(String name,
                                      int profileImage,
                                      String tel,
                                      LocalDateTime startTime,
                                      LocalDateTime endTime,
                                      StatusType status
    ) {
        public CrewDayScheduleInfo from(Crew crew, Schedule schedule) {
            return new CrewDayScheduleInfo(crew.getName(), crew.getProfileImage(), crew.getTel(), schedule.getStartTime(), schedule.getEndTime(), schedule.getStatus());
        }

    }
}


