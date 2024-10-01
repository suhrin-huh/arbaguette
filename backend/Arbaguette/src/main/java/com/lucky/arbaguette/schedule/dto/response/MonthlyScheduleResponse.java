package com.lucky.arbaguette.schedule.dto.response;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.substitute.domain.Substitute;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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
                                boolean substituteRequest,
                                Integer hopeCrewId,
                                String hopeCrewName,
                                LocalTime startTime,
                                LocalTime endTime) {
        public static DailySchedule from(Crew crew, Schedule schedule, Optional<Substitute> substitute) {
            return new DailySchedule(
                    crew.getCrewId(),
                    crew.getName(),
                    schedule.getScheduleId(),
                    substitute.isPresent(),
                    substitute.map(sub -> sub.getCrew().getCrewId()).orElse(null),
                    substitute.map(sub -> sub.getCrew().getName()).orElse(null),
                    schedule.getStartTime().toLocalTime(),
                    schedule.getEndTime().toLocalTime());
        }

    }
}
