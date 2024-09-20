package com.lucky.arbaguette.schedule.domain;

import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Duration;
import java.time.LocalDateTime;

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

    //    @JsonFormat(pattern = "YYYY:HH:mm")
    private LocalDateTime startTime;

    //    @JsonFormat(pattern = "HH:mm")
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    private LocalDateTime inTime;

    private LocalDateTime outTime;

    public int getDurationTime() {
        if (this.startTime != null && this.endTime != null) {
            return (int) Duration.between(this.startTime, this.endTime).toHours();
        }
        return 0;
    }

}
