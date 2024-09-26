package com.lucky.arbaguette.schedule.dto.response;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import java.time.LocalTime;
import java.util.List;

public record MonthlyScheduleResponse(List<MonthlySchedule> monthlyScheduleList) {


    public record MonthlySchedule(int date,
                                  List<DailySchedule> dailySchedules
    ) {

        public static MonthlySchedule from(int date,
                                           List<DailySchedule> dailySchedules) {
            return new MonthlySchedule(
                    date,
                    dailySchedules);
        }

    }

    public record DailySchedule(int crewId,
                                String name,
                                int scheduleId,
                                boolean SubstituteRequest,
                                LocalTime startTime,
                                LocalTime endTime) {
        public static DailySchedule from(Crew crew, Schedule schedule, boolean SubstituteRequest) {
            return new DailySchedule(
                    crew.getCrewId(),
                    crew.getName(),
                    schedule.getScheduleId(),
                    SubstituteRequest,
                    schedule.getStartTime().toLocalTime(),
                    schedule.getEndTime().toLocalTime());
        }

    }
}
