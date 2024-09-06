package com.lucky.arbaguette.schedule.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    @JsonFormat(pattern = "HH:mm")
    private LocalDate inTime;

    @JsonFormat(pattern = "HH:mm")
    private LocalDate outTime;

}
