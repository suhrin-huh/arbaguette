package com.lucky.arbaguette.schedule.dto.response;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;

import java.time.LocalTime;
import java.util.List;

public record MonthlyScheduleResponse(List<MonthlySchedule> monthlyScheduleList) {


    public record MonthlySchedule(int date,
                                  List<DailySchedule> dailySchedules
    ) {

        public static MonthlySchedule of(int date,
                                         List<DailySchedule> dailySchedules) {
            return new MonthlySchedule(
                    date,
                    dailySchedules);
        }

    }

    public record DailySchedule(int crewId,
                                String name,
                                LocalTime startTime,
                                LocalTime endTime) {

        public static DailySchedule of(Crew crew, Schedule schedule) {
            return new DailySchedule(
                    crew.getCrewId(),
                    crew.getName(),
                    schedule.getStartTime().toLocalTime(),
                    schedule.getEndTime().toLocalTime());
        }

    }
}
