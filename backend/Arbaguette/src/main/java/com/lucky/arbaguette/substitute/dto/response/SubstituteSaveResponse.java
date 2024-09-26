package com.lucky.arbaguette.substitute.dto.response;

import com.lucky.arbaguette.substitute.domain.Substitute;

public record SubstituteSaveResponse(int substituteId,
                                     int scheduleId) {

    public static SubstituteSaveResponse of(Substitute substitute) {
        return new SubstituteSaveResponse(
                substitute.getSubstituteId(),
                substitute.getSchedule().getScheduleId()
        );
    }
}
