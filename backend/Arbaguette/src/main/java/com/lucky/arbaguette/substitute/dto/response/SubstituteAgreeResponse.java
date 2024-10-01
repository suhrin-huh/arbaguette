package com.lucky.arbaguette.substitute.dto.response;

import com.lucky.arbaguette.crew.domain.Crew;

public record SubstituteAgreeResponse(int prevCrewId,
                                      String prevCrewName,
                                      int afterCrewId,
                                      String afterCrewName) {

    public static SubstituteAgreeResponse from(Crew prevCrew, Crew afterCrew) {
        return new SubstituteAgreeResponse(
                prevCrew.getCrewId(),
                prevCrew.getName(),
                afterCrew.getCrewId(),
                afterCrew.getName()
        );
    }
}
