package com.lucky.arbaguette.substitute.dto.response;

import static com.lucky.arbaguette.common.util.DateFormatUtil.formatDateTime;

import com.lucky.arbaguette.substitute.domain.Substitute;
import java.util.List;

public record SubstitutesResponse(List<SubstituteInfo> substituteInfos) {

    public static SubstitutesResponse of(List<Substitute> substitutes) {
        List<SubstituteInfo> substituteInfos = substitutes.stream()
                .map(substitute -> new SubstituteInfo(
                        substitute.getSubstituteId(),
                        substitute.getSchedule().getScheduleId(),
                        substitute.getSchedule().getCrew().getName(),
                        formatDateTime(substitute.getSchedule().getStartTime()),
                        formatDateTime(substitute.getSchedule().getEndTime())
                ))
                .toList();

        return new SubstitutesResponse(substituteInfos);
    }

    public record SubstituteInfo(int substituteId,
                                 int scheduleId,
                                 String crewName,
                                 String startTime,
                                 String endTime) {
    }
}
