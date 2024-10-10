package com.lucky.arbaguette.crew.domain.dto;

import com.lucky.arbaguette.contract.domain.Contract;
import com.lucky.arbaguette.crew.domain.Crew;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static java.time.LocalDate.now;

public record CrewInfo(int id,
                       String name,
                       String profileImage,
                       int salary,
                       long period,
                       LocalDate endDate,
                       List<Integer> weekdays
) {
    public static CrewInfo from(Crew crew, int salary) {
        return new CrewInfo(crew.getCrewId(),
                crew.getName(),
                crew.getProfileImage(),
                salary,
                0,
                null,
                null);
    }

    public static CrewInfo from(Crew crew, int salary, Contract contract, List<Integer> weekdays) {
        return new CrewInfo(crew.getCrewId(),
                crew.getName(),
                crew.getProfileImage(),
                salary,
                ChronoUnit.MONTHS.between(
                        contract.getStartDate().withDayOfMonth(1),
                        now().withDayOfMonth(1)),
                contract.getEndDate(),
                weekdays);
    }

}
