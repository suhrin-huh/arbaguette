package com.lucky.arbaguette.schedule.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Duration;
import java.time.LocalDateTime;

import static com.lucky.arbaguette.schedule.domain.StatusType.LATE;
import static com.lucky.arbaguette.schedule.domain.StatusType.NORMAL;

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

    private LocalDateTime startTime;

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

    public String getStatusMessage() {
        return status.getMessage();
    }

    @JsonIgnore
    public boolean isBeforeWork() {
        return this.status == null;
    }

    @JsonIgnore
    public boolean isAlreadyOutWork() {
        return outTime != null;
    }

    public void inWork(LocalDateTime nowTime) {
        this.inTime = nowTime;
        this.status = NORMAL;

        if (nowTime.isAfter(this.startTime)) {
            this.status = LATE;
        }
    }

    public void outWork(LocalDateTime nowTime) {
        this.outTime = nowTime;
    }

    @Builder
    public Schedule(Crew crew, LocalDateTime startTime, LocalDateTime endTime) {
        this.crew = crew;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
