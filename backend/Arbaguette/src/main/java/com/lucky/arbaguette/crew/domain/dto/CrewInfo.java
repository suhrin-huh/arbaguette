package com.lucky.arbaguette.crew.domain.dto;

import com.lucky.arbaguette.crew.domain.Crew;

public record CrewInfo(int id,
                       String name,
                       int profileImage,
                       int salary) {

    public static CrewInfo from(Crew crew, int salary) {
        return new CrewInfo(crew.getCrewId(),
                crew.getName(),
                crew.getProfileImage(),
                salary);
    }

}
