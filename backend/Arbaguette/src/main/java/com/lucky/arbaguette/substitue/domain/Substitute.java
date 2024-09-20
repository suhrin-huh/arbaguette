package com.lucky.arbaguette.substitue.domain;


import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Substitute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int substituteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Schedule schedule;

    private boolean permit;

}
